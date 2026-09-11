import { ChangeDetectionStrategy, Component } from '@angular/core';

import { INTERESTS, PROFESSIONAL_SKILLS } from '../../../../core/data/portfolio.data';
import { Icon } from '../../../../shared/components/icon/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-strengths',
  imports: [Icon, RevealDirective],
  templateUrl: './strengths.html',
  styleUrl: './strengths.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Strengths {
  protected readonly professionalSkills = PROFESSIONAL_SKILLS;
  protected readonly interests = INTERESTS;

  protected readonly principles = [
    {
      title: 'Reusable by default',
      body: 'Components, directives and utilities are written once and shared across modules — less duplication, faster releases.',
    },
    {
      title: 'Performance is a feature',
      body: 'Lazy routes, bundle budgets, deferred blocks and clean change detection keep pages quick on real devices.',
    },
    {
      title: 'Systematic delivery',
      body: 'Clear structure, predictable state and reviewable commits, whether I am solo on a module or inside a team.',
    },
  ] as const;
}
