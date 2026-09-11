import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Fades content in the first time it enters the viewport.
 * Server-rendered markup stays visible: the hidden state is only applied in the browser.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective {
  /** Stagger, in milliseconds, applied before the element animates. */
  readonly delay = input(0, { alias: 'appReveal', transform: (value: number | string) => +value });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const element = this.host.nativeElement;

      if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
        return;
      }

      element.style.setProperty('--reveal-delay', `${this.delay()}ms`);
      element.setAttribute('data-reveal', '');

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );

      observer.observe(element);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
