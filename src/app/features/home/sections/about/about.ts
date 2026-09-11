import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EDUCATION, PROFILE } from '../../../../core/data/portfolio.data';
import { Icon } from '../../../../shared/components/icon/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [Icon, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly profile = PROFILE;
  protected readonly education = EDUCATION;

  protected readonly facts = [
    { label: 'Based in', value: PROFILE.location },
    { label: 'Focus', value: 'Angular · TypeScript · NgRx' },
    { label: 'Also writes', value: 'NestJS · Express · MongoDB' },
    { label: 'Available for', value: 'Remote roles & contracts' },
  ] as const;
}
