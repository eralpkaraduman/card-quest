export function isOutgoingLink(href: string) {
  const anchor = document.createElement('a');
  anchor.href = href;
  return anchor.host !== window.location.host;
}
