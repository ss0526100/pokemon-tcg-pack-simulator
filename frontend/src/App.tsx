import Article from './components/Article/Article';
import { Global } from '@emotion/react';
import ImportImages from './components/PackSimulator/importImages';
import MainLayout from './layouts/MainLayout/MainLayout';
import PackSimulator from './components/PackSimulator/PackSimulator';
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
    <>
      <Global styles={reset} />
      <MainLayout>
        <PackSimulator />
        <Article />
      </MainLayout>
    </>
  );
}

export default App;
