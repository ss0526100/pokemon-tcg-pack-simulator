import * as S from './MovingCard.style';

import {
  HTMLProps,
  TouchEvent,
  MouseEvent as reactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Card from '@_components/Card/Card';
import isMobile from '@_utils/isMobile';

interface MovingCardProps extends HTMLProps<HTMLDivElement> {
  cardInfo: CardInfo;
}

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function MovingCard(props: MovingCardProps) {
  const { cardInfo, ...restProps } = props;
  const [position, setPosition] = useState<Position>();
  const positionRef = useRef<Position>();
  useEffect(() => {
    const intervalId = setInterval(() => setPosition(positionRef.current), 50);

    return () => clearInterval(intervalId);
  });

  const handleMouseMove = useCallback(
    (e: reactMouseEvent<HTMLDivElement, MouseEvent>) => {
      positionRef.current = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
        width: e.currentTarget.clientWidth,
        height: e.currentTarget.clientHeight,
      };
    },
    []
  );

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();

    // offsetX, offsetY를 계산
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    positionRef.current = {
      x: offsetX,
      y: offsetY,
      width: e.currentTarget.clientWidth,
      height: e.currentTarget.clientHeight,
    };
  }, []);

  const handleMoveOut = useCallback(() => {
    positionRef.current = undefined;
  }, []);
  return (
    <div
      css={S.container(position)}
      onMouseMove={isMobile() ? undefined : handleMouseMove}
      onMouseOut={handleMoveOut}
      onTouchMove={isMobile() ? handleTouchMove : undefined}
      onTouchEnd={handleMoveOut}
      {...restProps}
    >
      <Card cardInfo={cardInfo} />
    </div>
  );
}
