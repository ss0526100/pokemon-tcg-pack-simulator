import './locales/i18n';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Article from './pages/Article/Article';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import GetChallenge from './pages/GetChallenge/GetChallenge';
import { Global } from '@emotion/react';
import ImportImages from './pages/PackSimulator/importImages';
import MainLayout from './layouts/MainLayout/MainLayout';
import PackSimulator from './pages/PackSimulator/PackSimulator';
import { RecoilRoot } from 'recoil';
import reset from './reset.style';
import { useEffect } from 'react';

function isKakaoBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();

  // 카카오톡 브라우저 체크
  const isKakao = userAgent.indexOf('kakaotalk') !== -1;

  return isKakao;
}

if (isKakaoBrowser()) {
  location.href = 'kakaotalk://web/openExternal?url=' + location.href;
}

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <PackSimulator /> },
      {
        path: 'get-challenge',
        element: <GetChallenge />,
      },
    ],
  },
]);
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
        <RouterProvider router={router} />
        <Article />
      </MainLayout>
    </RecoilRoot>
  );
}

export default App;
