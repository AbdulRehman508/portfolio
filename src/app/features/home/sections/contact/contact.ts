import { DOCUMENT, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CONTACT_FORM, contactProvider } from '../../../../core/config/contact-form.config';
import { CONTACT_CHANNELS, PROFILE } from '../../../../core/data/portfolio.data';
import { Icon } from '../../../../shared/components/icon/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

type SendState = 'idle' | 'sending' | 'sent' | 'error' | 'mail-client';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Icon, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly document = inject(DOCUMENT);
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);

  protected readonly profile = PROFILE;
  protected readonly channels = CONTACT_CHANNELS;
  protected readonly state = signal<SendState>('idle');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(20)]],
    // Honeypot: real people never see it, bots fill it in.
    botcheck: [''],
  });

  protected submit(): void {
    if (this.state() === 'sending') {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, subject, message, botcheck } = this.form.getRawValue();

    if (botcheck) {
      // Silently accept and drop: telling a bot it failed only helps it retry.
      this.state.set('sent');
      this.form.reset();
      return;
    }

    this.state.set('sending');

    const useWeb3Forms = contactProvider() === 'web3forms';
    const endpoint = useWeb3Forms ? CONTACT_FORM.web3FormsEndpoint : CONTACT_FORM.formSubmitEndpoint;
    const payload = useWeb3Forms
      ? {
          access_key: CONTACT_FORM.web3FormsKey,
          subject: `Portfolio enquiry — ${subject}`,
          from_name: name,
          name,
          email,
          message,
          replyto: email,
        }
      : {
          name,
          email,
          message,
          _subject: `Portfolio enquiry — ${subject}`,
          _template: 'table',
          _captcha: 'false',
        };

    this.http.post<{ success: boolean | string }>(endpoint, payload).subscribe({
      // FormSubmit answers with the string "true", Web3Forms with a boolean.
      next: (response) => {
        if (response?.success === true || response?.success === 'true') {
          this.state.set('sent');
          this.form.reset();
        } else {
          this.state.set('error');
        }
      },
      error: () => this.state.set('error'),
    });
  }

  /** Fallback while no delivery key is configured, or when the visitor retries by mail. */
  protected openMailClient(
    name = this.form.controls.name.value,
    email = this.form.controls.email.value,
    subject = this.form.controls.subject.value,
    message = this.form.controls.message.value,
  ): void {
    const body = `${message}\n\n—\n${name}\n${email}`;
    const href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject || 'Portfolio enquiry',
    )}&body=${encodeURIComponent(body)}`;

    this.document.defaultView?.open(href, '_self');
    this.state.set('mail-client');
  }

  protected invalid(control: 'name' | 'email' | 'subject' | 'message'): boolean {
    const field = this.form.controls[control];
    return field.invalid && (field.touched || field.dirty);
  }
}
