// import { Counter } from '@/components/Counter';
// import { PostLists } from '@/components/PostLists';
// import { Utility } from '@/components/Utility';
import { NavBar } from '@/components/NavBar';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="flex grow">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
