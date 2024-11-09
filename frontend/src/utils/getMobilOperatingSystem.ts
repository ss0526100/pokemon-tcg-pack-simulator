export default function getMobileOperatingSystem() {
  //@ts-expect-error 다른 기기 호환을 위한 코드
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // iOS 감지
  //@ts-expect-error 다른 기기 호환을 위한 코드
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  // Android 감지
  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  return 'unknown';
}
