import * as S from './StatisticItem.style';

import { ReactNode } from 'react';

interface StatisticItemProps {
  title: ReactNode;
  content: string | number;
}

export default function StatisticItem(props: StatisticItemProps) {
  const { title, content } = props;

  return (
    <li css={S.container}>
      <div css={S.title}>{title}</div>
      <span css={S.span}>{content}</span>
    </li>
  );
}
