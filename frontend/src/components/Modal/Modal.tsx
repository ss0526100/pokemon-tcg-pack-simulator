import * as S from './Modal.style';

import { KeyboardEvent, PropsWithChildren, useEffect } from 'react';

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  hasDarkDimmer?: boolean;
  position?: 'center' | 'bottom';
}

export default function Modal(props: ModalProps) {
  const {
    onClose,
    children,
    hasDarkDimmer = true,
    position = 'center',
  } = props;

  useEffect(() => {
    if (!onClose) return;
    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose();
      }
    };

    //@ts-expect-error:KeyboardEvent가 안먹음
    document.addEventListener('keydown', handleModalKeyDown);

    //@ts-expect-error:KeyboardEvent가 안먹음
    return () => window.removeEventListener('keydown', handleModalKeyDown);
  }, [onClose]);

  useEffect(() => {
    const beforeSetting = {
      overflow: document.body.style.overflow,
    };
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = beforeSetting.overflow;
    };
  }, []);

  return (
    <>
      <div css={S.dimmer({ hasDarkDimmer })} onClick={onClose} />
      <div css={S.content({ position })} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </>
  );
}
