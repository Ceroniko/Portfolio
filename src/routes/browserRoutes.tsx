import { ROUTES } from '@constants';
import { useAuth } from '@hooks';
import { DefaultLayout } from '@layouts';
import { FC, PropsWithChildren, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('@pages/Home'));
const Blog = lazy(() => import('@pages/Blog'));
const BackOffice = lazy(() => import('@pages/BackOffice'));
const Login = lazy(() => import('@pages/Login'));

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const { isSignedIn, wasSignedIn } = useAuth();

  if (wasSignedIn && isSignedIn === null) {
    return <span>Loading...</span>;
  }

  return isSignedIn ? <div>{children}</div> : <Navigate to={ROUTES.BASE} replace={true} />;
};

const router = createBrowserRouter([
  {
    path: ROUTES.BASE,
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.BLOG,
        element: <Blog />,
      },
      {
        path: ROUTES.BACK_OFFICE,
        element: (
          <RequireAuth>
            <BackOffice />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
    ],
  },
]);

export { router };
