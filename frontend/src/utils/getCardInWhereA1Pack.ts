import {
  A1_CHARIZARD_PACK_ID_SET,
  A1_MEWTWO_PACK_ID_SET,
  A1_PIKACHU_PACK_ID_SET,
} from '../constant/card';

export function getCardInWhereA1Pack(id: string) {
  const packList: A1PackType[] = [];
  if (A1_CHARIZARD_PACK_ID_SET.has(id)) packList.push('charizard');
  if (A1_PIKACHU_PACK_ID_SET.has(id)) packList.push('pikachu');
  if (A1_MEWTWO_PACK_ID_SET.has(id)) packList.push('mewtwo');
  return packList;
}
