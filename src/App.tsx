import { router } from '@routes/browserRoutes';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Suspense fallback={'Suspense loading...'}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
