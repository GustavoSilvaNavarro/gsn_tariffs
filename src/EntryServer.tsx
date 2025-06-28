import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from './router/Router';

// NOTE: Server entry point since we are using SSR
export function render(url: string) {
  const router = createMemoryRouter(routes, { initialEntries: [url] });

  return renderToString(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  );
}
