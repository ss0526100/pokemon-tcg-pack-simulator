export default function isMobile() {
  const regex =
    /mobi|android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

  return regex.test(navigator.userAgent.toLocaleLowerCase());
}
