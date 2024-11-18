import { SVGProps } from 'react';
import SoundOffSvg from '../svgs/SoundOffSvg';
import SoundOnSvg from '../svgs/SoundOnSvg';
import useIsPlayingBGM from '../../hooks/atoms/bgm/useIsPlayingBGM';

interface SoundSvg extends SVGProps<SVGSVGElement> {
  fill?: string;
  size?: number;
}
export default function SoundSvg(props: SoundSvg) {
  const isPlayingBGM = useIsPlayingBGM()[0];

  if (isPlayingBGM) return <SoundOnSvg {...props} />;
  return <SoundOffSvg {...props} />;
}
