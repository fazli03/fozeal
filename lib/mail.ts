/**
 * Gmail's compose window, pre-addressed.
 *
 * `mailto:` is the semantically correct link, but it only works when the
 * visitor's machine has a desktop mail client registered — on a Windows box
 * with no mail app installed, clicking it does nothing at all. This builds a
 * real URL instead, so the click always lands somewhere: a compose window with
 * the address, and optionally the subject, already filled in.
 *
 * The trade-off is that it assumes Google. Anyone signed into a Google account
 * gets a ready-to-send message; anyone else meets a sign-in page. That is why
 * the address is also printed as selectable text next to every one of these
 * links — a visitor who uses something else can still copy it.
 */
export function gmailComposeUrl(to: string, subject?: string, body?: string): string {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to })
  if (subject) params.set('su', subject)
  if (body) params.set('body', body)
  return `https://mail.google.com/mail/?${params.toString()}`
}
