import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { PROJECTS } from '../../../../core/data/portfolio.data';
import { Project } from '../../../../core/models/portfolio.model';
import { Icon } from '../../../../shared/components/icon/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

const ALL = 'All';

@Component({
  selector: 'app-projects',
  imports: [Icon, RevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly filters: readonly string[] = [
    ALL,
    ...new Set(PROJECTS.map((project) => project.category)),
  ];

  protected readonly activeFilter = signal<string>(ALL);
  protected readonly expanded = signal<string | null>(null);

  protected readonly visibleProjects = computed<readonly Project[]>(() => {
    const filter = this.activeFilter();
    return filter === ALL ? PROJECTS : PROJECTS.filter((project) => project.category === filter);
  });

  protected setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }

  protected pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  protected toggle(title: string): void {
    this.expanded.update((current) => (current === title ? null : title));
  }
}
