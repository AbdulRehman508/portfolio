import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SITE, absoluteUrl } from '../config/site.config';
import { PROFILE } from '../data/portfolio.data';

/** Sets document metadata + Person JSON-LD so the prerendered page shares well. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  apply(): void {
    const pageTitle = `${PROFILE.name} — ${PROFILE.role} & Sr. Angular Developer`;
    const description = PROFILE.summary;
    const image = absoluteUrl(SITE.ogImage);

    this.title.setTitle(pageTitle);

    this.meta.addTags(
      [
        { name: 'description', content: description },
        {
          name: 'keywords',
          content:
            'Abdul Rehman, Angular Developer, Senior Angular Developer, Frontend Engineer, TypeScript, NgRx, NestJS, Faisalabad, Pakistan',
        },
        { name: 'author', content: PROFILE.name },
        { name: 'theme-color', content: '#070a12' },
        { property: 'og:type', content: 'profile' },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: description },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: PROFILE.name },
        { property: 'og:image', content: image },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: `${PROFILE.name} — ${PROFILE.headline}` },
        ...(SITE.url ? [{ property: 'og:url', content: absoluteUrl('') }] : []),
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
      ],
      true,
    );

    this.addPersonSchema();
  }

  private addPersonSchema(): void {
    const id = 'person-schema';
    if (this.document.getElementById(id)) {
      return;
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PROFILE.name,
      jobTitle: PROFILE.role,
      email: `mailto:${PROFILE.email}`,
      telephone: PROFILE.phone,
      address: { '@type': 'PostalAddress', addressLocality: PROFILE.location },
      sameAs: PROFILE.socials.filter((s) => s.url.startsWith('http')).map((s) => s.url),
      knowsAbout: ['Angular', 'TypeScript', 'NgRx', 'NestJS', 'MongoDB', 'ERP', 'CRM'],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'GC University Faisalabad' },
    };

    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
