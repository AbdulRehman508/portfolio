import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SKILL_GROUPS } from '../../../../core/data/portfolio.data';
import { IconName, Icon } from '../../../../shared/components/icon/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [Icon, RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;

  /** Marquee needs the list twice so the loop is seamless. */
  protected readonly ticker = [...SKILL_GROUPS.flatMap((group) => group.skills)];

  protected iconFor(name: string): IconName {
    return name as IconName;
  }
}
