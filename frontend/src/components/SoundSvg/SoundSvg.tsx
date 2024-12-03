import { SVGProps } from 'react';
import SoundOffSvg from '@_components/svgs/SoundOffSvg';
import SoundOnSvg from '@_components/svgs/SoundOnSvg';
import useBGMUtils from '@_hooks/atoms/bgm/useBGMUtils';

interface BGMSvgProps extends SVGProps<SVGSVGElement> {
  fill?: string;
  size?: number;
}
export default function BGMSvg(props: BGMSvgProps) {
  const { isPlayingBGM } = useBGMUtils();

  if (isPlayingBGM) return <SoundOnSvg {...props} />;
  return <SoundOffSvg {...props} />;
}
