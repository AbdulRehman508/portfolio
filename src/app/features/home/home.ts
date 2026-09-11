import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';

import { NAV_ITEMS } from '../../core/data/portfolio.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { SeoService } from '../../core/services/seo.service';
import { Footer } from '../../layout/footer/footer';
import { Header } from '../../layout/header/header';
import { Icon } from '../../shared/components/icon/icon';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { ExperienceSection } from './sections/experience/experience';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Skills } from './sections/skills/skills';
import { Strengths } from './sections/strengths/strengths';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Footer,
    Hero,
    About,
    Skills,
    ExperienceSection,
    Projects,
    Strengths,
    Contact,
    Icon,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly scrollSpy = inject(ScrollSpyService);

  protected readonly condensed = this.scrollSpy.condensed;

  constructor() {
    inject(SeoService).apply();

    afterNextRender(() => this.scrollSpy.observe(NAV_ITEMS.map((item) => item.id)));
  }

  protected toTop(): void {
    this.scrollSpy.scrollToTop();
  }
}
