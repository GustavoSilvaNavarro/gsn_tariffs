// import { Counter } from '@/components/Counter';
// import { PostLists } from '@/components/PostLists';
// import { Utility } from '@/components/Utility';
import { NavBar } from '@/components/NavBar';
import { Outlet } from 'react-router';
import PageErrorBoundary from './errors/ErrorBoundary';

function App() {
  return (
    <div className="flex grow">
      <NavBar />
      <PageErrorBoundary>
        <Outlet />
      </PageErrorBoundary>
    </div>
  );
}

export default App;
