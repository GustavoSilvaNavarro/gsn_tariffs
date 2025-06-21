import { createBrowserRouter, redirect } from 'react-router';
import App from '@/App';
import { LoadEntity } from '@/pages/LoadEntity';
import { Tariffs } from '@/pages/Tariffs';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      // When the path is exactly '/', redirect to '/utilities'
      {
        index: true, // This route handles the exact '/' path
        loader: () => redirect('/utilities'), // Use loader for redirect
      },
      // This is the actual route for /utilities
      {
        path: 'utilities',
        Component: LoadEntity,
      },
      {
        path: 'tariffs',
        Component: Tariffs,
      },
    ],
  },
]);
