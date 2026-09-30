import { DestroyRef, Directive, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Tracks the pointer inside a card and exposes it as CSS custom properties, so
 * the card can light up under the cursor. Pointer-only: touch devices never
 * fire the listener, and the styles fall back to a plain hover state.
 */
@Directive({
  selector: '[appSpotlight]',
  host: {
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'onLeave()',
    class: 'has-spotlight',
  },
})
export class SpotlightDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    inject(DestroyRef).onDestroy(() => this.onLeave());
  }

  protected onMove(event: PointerEvent): void {
    if (!this.isBrowser || event.pointerType === 'touch') {
      return;
    }

    const element = this.host.nativeElement;
    const rect = element.getBoundingClientRect();

    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    element.style.setProperty('--spot-opacity', '1');
  }

  protected onLeave(): void {
    this.host.nativeElement.style.setProperty('--spot-opacity', '0');
  }
}
