import Article from './pages/Article/Article';
import { Global } from '@emotion/react';
import ImportImages from './pages/PackSimulator/importImages';
import MainLayout from './layouts/MainLayout/MainLayout';
import PackSimulator from './pages/PackSimulator/PackSimulator';
import { RecoilRoot } from 'recoil';
import reset from './reset.style';
import { useEffect } from 'react';

const effectKeys = [' '];
function App() {
  useEffect(() => {
    ImportImages();
    function handleKeyDown(event: KeyboardEvent) {
      if (effectKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
    addEventListener('keydown', handleKeyDown);
    return () => removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <RecoilRoot>
      <Global styles={reset} />
      <MainLayout>
        <PackSimulator />
        <Article />
      </MainLayout>
    </RecoilRoot>
  );
}

export default App;
