import Article from './components/Article/Article';
import { Global } from '@emotion/react';
import MainLayout from './layouts/MainLayout/MainLayout';
import PackSimulator from './components/PackSimulator/PackSimulator';
import reset from './reset.style';

function App() {
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

