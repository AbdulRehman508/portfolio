import {
  DOCUMENT,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { NAV_ITEMS, PROFILE, PROJECTS } from '../../../core/data/portfolio.data';
import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { ScrollSpyService } from '../../../core/services/scroll-spy.service';
import { ThemeService } from '../../../core/services/theme.service';
import { Icon, IconName } from '../icon/icon';

interface Command {
  readonly id: string;
  readonly group: 'Go to' | 'Projects' | 'Actions';
  readonly label: string;
  readonly hint: string;
  readonly icon: IconName;
  readonly keywords: string;
  readonly run: () => void;
}

@Component({
  selector: 'app-command-palette',
  imports: [Icon],
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
})
export class CommandPalette {
  private readonly document = inject(DOCUMENT);
  private readonly palette = inject(CommandPaletteService);
  private readonly scrollSpy = inject(ScrollSpyService);
  private readonly theme = inject(ThemeService);

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('search');

  protected readonly isOpen = this.palette.isOpen;
  protected readonly query = signal('');
  protected readonly activeIndex = signal(0);

  private readonly commands: readonly Command[] = [
    ...NAV_ITEMS.map(
      (item): Command => ({
        id: `nav-${item.id}`,
        group: 'Go to',
        label: item.label,
        hint: 'Section',
        icon: 'arrow-right',
        keywords: item.label,
        run: () => this.scrollSpy.scrollTo(item.id),
      }),
    ),
    ...PROJECTS.map(
      (project): Command => ({
        id: `project-${project.title}`,
        group: 'Projects',
        label: project.title,
        hint: project.category,
        icon: 'code',
        keywords: `${project.title} ${project.category} ${project.stack.join(' ')}`,
        run: () => this.scrollSpy.scrollTo('projects'),
      }),
    ),
    {
      id: 'action-email',
      group: 'Actions',
      label: 'Email Abdul',
      hint: PROFILE.email,
      icon: 'mail',
      keywords: `email mail contact hire ${PROFILE.email}`,
      run: () => this.openUrl(`mailto:${PROFILE.email}`),
    },
    {
      id: 'action-call',
      group: 'Actions',
      label: 'Call',
      hint: PROFILE.phone,
      icon: 'phone',
      keywords: `call phone number ${PROFILE.phone}`,
      run: () => this.openUrl(`tel:${PROFILE.phone.replace(/\s/g, '')}`),
    },
    {
      id: 'action-linkedin',
      group: 'Actions',
      label: 'Open LinkedIn',
      hint: 'Profile',
      icon: 'linkedin',
      keywords: 'linkedin social profile network',
      run: () => this.openUrl(PROFILE.socials[0].url, '_blank'),
    },
    {
      id: 'action-resume',
      group: 'Actions',
      label: 'Download CV',
      hint: 'PDF',
      icon: 'download',
      keywords: 'cv resume download pdf',
      run: () => this.openUrl(PROFILE.resumeUrl, '_blank'),
    },
    {
      id: 'action-theme',
      group: 'Actions',
      label: 'Toggle theme',
      hint: 'Light / dark',
      icon: 'sun',
      keywords: 'theme dark light mode colour color',
      run: () => this.theme.toggle(),
    },
  ];

  protected readonly results = computed<readonly Command[]>(() => {
    const query = this.query().trim().toLowerCase();
    if (!query) {
      return this.commands;
    }

    return this.commands.filter((command) =>
      `${command.label} ${command.keywords}`.toLowerCase().includes(query),
    );
  });

  /** Group headers are rendered by comparing against the previous row. */
  protected readonly groupOf = (index: number): string | null => {
    const results = this.results();
    const group = results[index]?.group;
    return index === 0 || results[index - 1]?.group !== group ? (group ?? null) : null;
  };

  constructor() {
    effect(() => {
      const open = this.isOpen();
      this.document.body.classList.toggle('is-locked', open);

      if (open) {
        this.query.set('');
        this.activeIndex.set(0);
        // The input only exists once the dialog is in the DOM.
        this.document.defaultView?.requestAnimationFrame(() =>
          this.searchInput()?.nativeElement.focus(),
        );
      }
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    const isToggle = (event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey);

    if (isToggle) {
      event.preventDefault();
      this.palette.toggle();
      return;
    }

    if (!this.isOpen()) {
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.move(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.move(-1);
        break;
      case 'Enter': {
        event.preventDefault();
        const command = this.results()[this.activeIndex()];
        if (command) {
          this.run(command);
        }
        break;
      }
    }
  }

  protected onQuery(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  protected run(command: Command): void {
    this.close();
    command.run();
  }

  protected close(): void {
    this.palette.close();
  }

  private move(delta: number): void {
    const total = this.results().length;
    if (!total) {
      return;
    }

    this.activeIndex.update((index) => (index + delta + total) % total);
  }

  private openUrl(url: string, target: '_self' | '_blank' = '_self'): void {
    this.document.defaultView?.open(url, target, target === '_blank' ? 'noopener' : '');
  }
}
