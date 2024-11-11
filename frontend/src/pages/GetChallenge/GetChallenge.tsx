import ChooseChallenge from './ChooseChallenge/ChooseChallenge';
import GameLayout from '../../layouts/GameLayout/GameLayout';

export default function GetChallenge() {
  return (
    <GameLayout>
      <GameLayout.Content>
        <ChooseChallenge />
      </GameLayout.Content>
    </GameLayout>
  );
}
