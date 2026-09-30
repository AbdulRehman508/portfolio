import { Injectable, signal } from '@angular/core';

/** Tiny shared switch so the header (and any other chrome) can open the palette. */
@Injectable({ providedIn: 'root' })
export class CommandPaletteService {
  private readonly _isOpen = signal(false);

  readonly isOpen = this._isOpen.asReadonly();

  open(): void {
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
  }

  toggle(): void {
    this._isOpen.update((open) => !open);
  }
}
