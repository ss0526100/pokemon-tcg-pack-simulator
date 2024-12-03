import BGMSvg from '@_components/SoundSvg/SoundSvg';
import COLOR from '@_constant/colors';
import ToolbarItem from '@_components/ToolbarItem/ToolbarItem';
import useBGMUtils from '@_hooks/atoms/bgm/useBGMUtils';
import { useTranslation } from 'react-i18next';

export default function BGMOnOffToolbar() {
  const { t } = useTranslation();
  const { isPlayingBGM, toggleBGM } = useBGMUtils();
  return (
    <ToolbarItem
      svg={<BGMSvg fill={COLOR.PRIMARY_COLOR} size={40} />}
      description={
        isPlayingBGM ? t('toolbar.sound-off') : t('toolbar.sound-on')
      }
      onClick={() => toggleBGM()}
    />
  );
}
