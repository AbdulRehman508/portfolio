import { PROFILE } from '../data/portfolio.data';

/**
 * Contact form delivery.
 *
 * Default provider is FormSubmit: it needs no account and no key — submissions
 * are emailed to the address in the endpoint. The very first submission sends a
 * one-time activation link to that inbox; click it and every message after that
 * lands directly.
 *
 * To switch to Web3Forms instead (own dashboard, spam filtering, 250 free
 * messages a month), grab a key at https://web3forms.com and paste it into
 * `web3FormsKey`. The access key is public by design — it can only send to the
 * address it was issued for — so it is safe in client code.
 */
export const CONTACT_FORM = {
  formSubmitEndpoint: `https://formsubmit.co/ajax/${PROFILE.email}`,
  web3FormsEndpoint: 'https://api.web3forms.com/submit',
  web3FormsKey: '',
} as const;

export type ContactProvider = 'web3forms' | 'formsubmit';

export const contactProvider = (): ContactProvider =>
  CONTACT_FORM.web3FormsKey.trim().length > 0 ? 'web3forms' : 'formsubmit';
