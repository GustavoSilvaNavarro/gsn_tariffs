import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { routes } from '@/router/Router';

// NOTE: this is the browser react app used for hydration
export const ClientApp = () => {
  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
