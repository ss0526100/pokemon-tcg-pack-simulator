import { useEffect, useState } from 'react';

const useScrollLock = () => {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (isLocked) {
      // 스크롤 잠금: body의 overflow를 hidden으로 설정
      document.body.style.overflow = 'hidden';
    } else {
      // 스크롤 해제: body의 overflow를 원래 상태로 복구
      document.body.style.overflow = '';
    }

    // 컴포넌트가 언마운트될 때 overflow 스타일 원상 복구
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);

  // 스크롤 잠금 및 해제를 토글하는 함수
  const toggleScrollLock = () => {
    setIsLocked(prev => !prev);
  };

  return { isLocked, toggleScrollLock };
};

export default useScrollLock;
