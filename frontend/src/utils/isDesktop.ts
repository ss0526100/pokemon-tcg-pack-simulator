export default function isDesktop() {
  const userAgent = navigator.userAgent.toLowerCase();

  return /windows|macintosh|mac os x|linux/.test(userAgent);
}
