import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type IconName =
  | 'arrow-right'
  | 'arrow-up'
  | 'briefcase'
  | 'check'
  | 'close'
  | 'code'
  | 'download'
  | 'external'
  | 'graduation'
  | 'layers'
  | 'linkedin'
  | 'github'
  | 'location'
  | 'mail'
  | 'menu'
  | 'moon'
  | 'phone'
  | 'send'
  | 'server'
  | 'sparkle'
  | 'sun'
  | 'whatsapp';

/** Stroke-based icon set kept inline so there is no runtime request for chrome. */
const PATHS: Record<IconName, readonly string[]> = {
  'arrow-right': ['M5 12h14', 'm13 6 6 6-6 6'],
  'arrow-up': ['M12 19V5', 'm5 12 7-7 7 7'],
  briefcase: [
    'M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z',
    'M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2',
    'M3 13h18',
  ],
  check: ['m4 12 5 5L20 6'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  code: ['m9 18-6-6 6-6', 'm15 6 6 6-6 6'],
  download: ['M12 3v12', 'm7 11 5 5 5-5', 'M4 21h16'],
  external: ['M14 4h6v6', 'M20 4 10 14', 'M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'],
  graduation: ['m2 8 10-4 10 4-10 4Z', 'M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5', 'M22 8v6'],
  layers: ['m12 3 9 5-9 5-9-5Z', 'm3 13 9 5 9-5', 'm3 17 9 5 9-5'],
  linkedin: [
    'M6.5 8.5v10',
    'M6.5 4.5v.01',
    'M11 18.5v-6a3.5 3.5 0 0 1 7 0v6',
    'M11 12.5v6',
    'M3 3h18v18H3z',
  ],
  github: [
    'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  ],
  location: ['M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  mail: ['M3 6h18v12H3z', 'm3 7 9 6 9-6'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h10'],
  moon: ['M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z'],
  phone: [
    'M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6.5 3Z',
  ],
  send: ['m21 3-9.5 9.5', 'M21 3 14.5 21l-3-7.5L4 10.5 21 3Z'],
  server: ['M3 4h18v6H3z', 'M3 14h18v6H3z', 'M7 7v.01', 'M7 17v.01'],
  sparkle: ['m12 3 2.2 5.3L19.5 10l-5.3 1.7L12 17l-2.2-5.3L4.5 10l5.3-1.7Z', 'M18.5 16.5 19.5 19l2.5 1-2.5 1-1 2.5'],
  sun: [
    'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
    'M12 2v2',
    'M12 20v2',
    'M4.9 4.9 6.3 6.3',
    'M17.7 17.7l1.4 1.4',
    'M2 12h2',
    'M20 12h2',
    'M4.9 19.1 6.3 17.7',
    'M17.7 6.3l1.4-1.4',
  ],
  whatsapp: [
    'M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21Z',
    'M8.8 8.4c.3-.7.6-.7.9-.7h.7c.2 0 .5 0 .7.6l.8 1.9c0 .3 0 .5-.2.7l-.5.6c-.2.2-.3.4-.1.7a7 7 0 0 0 3.2 2.8c.3.1.5.1.7-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5v.8c0 .3-.3.9-1.1 1.2',
  ],
};

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (d of paths(); track d) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
  readonly strokeWidth = input(1.7);

  protected readonly paths = computed(() => PATHS[this.name()] ?? []);
}
