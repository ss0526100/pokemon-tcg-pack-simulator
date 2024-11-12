import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Article from './pages/Article/Article';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import GetChallenge from './pages/GetChallenge/GetChallenge';
import { Global } from '@emotion/react';
import ImportImages from './pages/PackSimulator/importImages';
import MainLayout from './layouts/MainLayout/MainLayout';
import PackSimulator from './pages/PackSimulator/PackSimulator';
import { RecoilRoot } from 'recoil';
import { polyfill } from 'seamless-scroll-polyfill';
import reset from './reset.style';
import { useEffect } from 'react';

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

  useEffect(() => {
    polyfill();
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
