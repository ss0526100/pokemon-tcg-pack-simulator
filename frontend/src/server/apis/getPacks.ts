import getPack from './getPack';

export default function getPacks(type: PackType, cnt: number = 1) {
  return new Array(cnt).fill(null).map(() => getPack(type));
}
