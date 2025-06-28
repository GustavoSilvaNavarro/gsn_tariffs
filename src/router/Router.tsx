import { redirect } from 'react-router';
import App from '@/App';
import { LoadEntity } from '@/pages/LoadEntity';
import { Tariffs } from '@/pages/Tariffs';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const routes = [
  {
    path: '/',
    Component: App,
    // need to use a hydrate fallback during initial render
    HydrateFallback: LoadingSpinner,
    children: [
      // When the path is exactly '/', redirect to '/utilities'
      {
        index: true, // This route handles the exact '/' path
        loader: () => redirect('/utilities'), // Use loader for redirect
        Component: LoadingSpinner,
      },
      { path: 'utilities', Component: LoadEntity },
      { path: 'tariffs', Component: Tariffs },
    ],
  },
];
