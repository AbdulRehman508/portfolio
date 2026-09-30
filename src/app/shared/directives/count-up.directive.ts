import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const DURATION = 1100;

/**
 * Counts a rendered number up when it first scrolls into view.
 *
 * The final value is whatever the server already rendered ("9", "25+", "4+"),
 * so the text is correct without JavaScript and the suffix survives.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const element = this.host.nativeElement;
      const view = element.ownerDocument.defaultView;

      if (!this.isBrowser || !view || typeof IntersectionObserver === 'undefined') {
        return;
      }

      if (view.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const parsed = /^(\d+(?:\.\d+)?)(.*)$/.exec(element.textContent?.trim() ?? '');
      if (!parsed) {
        return;
      }

      const target = Number(parsed[1]);
      const suffix = parsed[2];
      const decimals = parsed[1].includes('.') ? 1 : 0;

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) {
            return;
          }

          observer.disconnect();
          this.animate(element, target, suffix, decimals, view);
        },
        { threshold: 0.4 },
      );

      observer.observe(element);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private animate(
    element: HTMLElement,
    target: number,
    suffix: string,
    decimals: number,
    view: Window,
  ): void {
    const start = view.performance.now();
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION);
      // Ease-out cubic: fast first, settles on the number.
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        frame = view.requestAnimationFrame(step);
      }
    };

    frame = view.requestAnimationFrame(step);
    this.destroyRef.onDestroy(() => view.cancelAnimationFrame(frame));
  }
}
