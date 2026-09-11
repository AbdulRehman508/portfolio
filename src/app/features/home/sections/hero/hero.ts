import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { PROFILE, STATS } from '../../../../core/data/portfolio.data';
import { Icon } from '../../../../shared/components/icon/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

const ROTATING_ROLES = [
  'Sr. Angular Developer',
  'Frontend Architect',
  'TypeScript Engineer',
  'ERP & CRM Specialist',
] as const;

@Component({
  selector: 'app-hero',
  imports: [Icon, RevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);

  protected readonly profile = PROFILE;
  protected readonly stats = STATS;
  protected readonly roles = ROTATING_ROLES;

  protected readonly roleIndex = signal(0);
  protected readonly avatarFailed = signal(false);

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) {
        return;
      }

      const timer = setInterval(
        () => this.roleIndex.update((index) => (index + 1) % ROTATING_ROLES.length),
        2600,
      );

      this.destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  protected onAvatarError(): void {
    this.avatarFailed.set(true);
  }
}
