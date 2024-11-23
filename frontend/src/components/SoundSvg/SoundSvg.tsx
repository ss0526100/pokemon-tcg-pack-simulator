import { SVGProps } from 'react';
import SoundOffSvg from '../svgs/SoundOffSvg';
import SoundOnSvg from '../svgs/SoundOnSvg';
import useBGMUtils from '../../hooks/atoms/bgm/useBGMUtils';

interface BGMSvgProps extends SVGProps<SVGSVGElement> {
  fill?: string;
  size?: number;
}
export default function BGMSvg(props: BGMSvgProps) {
  const { isPlayingBGM } = useBGMUtils();

  if (isPlayingBGM) return <SoundOnSvg {...props} />;
  return <SoundOffSvg {...props} />;
}
