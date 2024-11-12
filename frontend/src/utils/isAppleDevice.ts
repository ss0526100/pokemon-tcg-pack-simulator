export default function isAppleDevice() {
  const userAgent = navigator.userAgent || navigator.vendor;

  // iOS (iPhone, iPad, iPod) 검사
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);

  // macOS 검사
  const isMacOS =
    /Macintosh/.test(userAgent) && !/iPhone|iPad|iPod/.test(userAgent);

  return isIOS || isMacOS;
}
