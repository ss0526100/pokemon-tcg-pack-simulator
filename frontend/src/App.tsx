import './locales/i18n';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Article from './pages/Article/Article';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import GetChallenge from '@_pages/GetChallenge/GetChallenge';
import { Global } from '@emotion/react';
import MainLayout from '@_layouts/MainLayout/MainLayout';
import PackSimulator from './pages/PackSimulator/PackSimulator';
import { RecoilRoot } from 'recoil';
import StartPage from './pages/StartPage/StartPage';
import i18n from './locales/i18n';
import reset from './reset.style';
import { useEffect } from 'react';

// import ImportImages from './pages/PackSimulator/importImages';

function isKakaoBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();

  // 카카오톡 브라우저 체크
  const isKakao = userAgent.indexOf('kakaotalk') !== -1;

  return isKakao;
}

if (isKakaoBrowser()) {
  location.href = 'kakaotalk://web/openExternal?url=' + location.href;
}

const router = createBrowserRouter(
  [
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
const effectKeys = [' '];
function App() {
  useEffect(() => {
    // TODO: 이후 활성화
    // ImportImages();

    function handleKeyDown(event: KeyboardEvent) {
      if (effectKeys.includes(event.key)) {
        event.preventDefault();
      }
    }

    addEventListener('keydown', handleKeyDown);
    return () => removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const language = i18n.language;
    const htmlTag = document.getElementsByTagName('html')[0];
    if (!htmlTag) return;

    htmlTag.lang = language.slice(0, 2);
  }, []);

  return (
    <RecoilRoot>
      <StartPage />
      <Global styles={reset} />
      <MainLayout>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
        <Article />
      </MainLayout>
    </RecoilRoot>
  );
}

export default App;
