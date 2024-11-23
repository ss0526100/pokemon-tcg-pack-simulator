import COLOR from '../../constant/colors';
import CollectionContent from '../CollectionContent/CollectionContent';
import SixPacksSvg from '../../components/svgs/SixPacksSvg';
import ToolbarItem from '../../components/ToolbarItem/ToolbarItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CardCollectionToolbar() {
  const { t } = useTranslation();
  const [isCollectionContentViewed, setIsCollectionContentViewed] =
    useState(false);
  return (
    <>
      <ToolbarItem
        svg={<SixPacksSvg fill={COLOR.PRIMARY_COLOR} size={30} />}
        description={t('toolbar.card-list')}
        onClick={() => setIsCollectionContentViewed(true)}
      />
      {isCollectionContentViewed && (
        <CollectionContent
          onClose={() => setIsCollectionContentViewed(false)}
        />
      )}
    </>
  );
}
