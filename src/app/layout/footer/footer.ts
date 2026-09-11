import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CONTACT_CHANNELS, NAV_ITEMS, PROFILE } from '../../core/data/portfolio.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly scrollSpy = inject(ScrollSpyService);

  protected readonly profile = PROFILE;
  protected readonly navItems = NAV_ITEMS;
  protected readonly channels = CONTACT_CHANNELS;
  protected readonly year = new Date().getFullYear();

  protected toTop(): void {
    this.scrollSpy.scrollToTop();
  }
}
