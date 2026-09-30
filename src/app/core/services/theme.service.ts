import { DOCUMENT, Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'ar-portfolio-theme';

/** Owns the active colour scheme and mirrors it onto `<html data-theme>`. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly _theme = signal<Theme>(this.resolveInitialTheme());

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this._theme();
      this.document.documentElement.setAttribute('data-theme', theme);

      if (!this.isBrowser) {
        return;
      }

      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Storage can be unavailable (private mode / blocked cookies) — theme still applies.
      }
    });
  }

  toggle(): void {
    const flip = () => this._theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));

    // Cross-fade the whole page where the browser supports it; plain flip elsewhere.
    const startViewTransition = (
      this.document as Document & {
        startViewTransition?: (callback: () => void) => unknown;
      }
    ).startViewTransition;

    const reducedMotion =
      this.isBrowser &&
      this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this.isBrowser || reducedMotion || typeof startViewTransition !== 'function') {
      flip();
      return;
    }

    startViewTransition.call(this.document, flip);
  }

  set(theme: Theme): void {
    this._theme.set(theme);
  }

  private resolveInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'dark';
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch {
      // ignored — fall through to the media query
    }

    return this.document.defaultView?.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
}
