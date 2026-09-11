import { DOCUMENT, DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Tracks page scroll once, and derives everything the chrome needs from it:
 * the active section id, whether the header should condense, and read progress.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private sectionIds: readonly string[] = [];
  private frame = 0;

  private readonly _activeSection = signal<string>('');
  private readonly _condensed = signal(false);
  private readonly _progress = signal(0);

  readonly activeSection = this._activeSection.asReadonly();
  readonly condensed = this._condensed.asReadonly();
  readonly progress = this._progress.asReadonly();

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    const view = this.document.defaultView!;
    const onScroll = () => this.schedule();

    view.addEventListener('scroll', onScroll, { passive: true });
    view.addEventListener('resize', onScroll, { passive: true });

    inject(DestroyRef).onDestroy(() => {
      view.removeEventListener('scroll', onScroll);
      view.removeEventListener('resize', onScroll);
      view.cancelAnimationFrame(this.frame);
    });
  }

  /** Called by the page once its sections exist in the DOM. */
  observe(ids: readonly string[]): void {
    this.sectionIds = ids;
    this.measure();
  }

  scrollTo(id: string): void {
    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private schedule(): void {
    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    view.cancelAnimationFrame(this.frame);
    this.frame = view.requestAnimationFrame(() => this.measure());
  }

  private measure(): void {
    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    const scrollY = view.scrollY;
    const docHeight = this.document.documentElement.scrollHeight - view.innerHeight;

    this._condensed.set(scrollY > 24);
    this._progress.set(docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0);

    // A section counts as active once its top crosses just below the header.
    const threshold = view.innerHeight * 0.32;
    let active = '';

    for (const id of this.sectionIds) {
      const top = this.document.getElementById(id)?.getBoundingClientRect().top;
      if (top !== undefined && top <= threshold) {
        active = id;
      }
    }

    // At the very bottom the last section wins, even if it is short.
    if (docHeight > 0 && scrollY >= docHeight - 4 && this.sectionIds.length) {
      active = this.sectionIds[this.sectionIds.length - 1];
    }

    this._activeSection.set(active);
  }
}
