import { DOCUMENT, ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';

import { NAV_ITEMS, PROFILE } from '../../core/data/portfolio.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { ThemeService } from '../../core/services/theme.service';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-header',
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly theme = inject(ThemeService);
  private readonly scrollSpy = inject(ScrollSpyService);

  protected readonly profile = PROFILE;
  protected readonly navItems = NAV_ITEMS;

  protected readonly isDark = this.theme.isDark;
  protected readonly activeSection = this.scrollSpy.activeSection;
  protected readonly condensed = this.scrollSpy.condensed;
  protected readonly progress = this.scrollSpy.progress;

  protected readonly menuOpen = signal(false);

  constructor() {
    // Keep the page behind the mobile drawer from scrolling.
    effect(() => {
      this.document.body.classList.toggle('is-locked', this.menuOpen());
    });
  }

  protected toggleTheme(): void {
    this.theme.toggle();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
