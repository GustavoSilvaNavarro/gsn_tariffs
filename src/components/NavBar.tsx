import { Link } from 'react-router';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import gsnIcon from '@/assets/gsn_logo.webp';

export const NavBar = () => {
  return (
    <header className="h-screen flex-[0.2_1_0%] min-w-[280px] bg-[#020712] text-white">
      <nav className="py-4">
        <Link to="/" data-testid="cy-home-route" className="flex items-center justify-center p-4 cursor-pointer mb-2">
          <img src={gsnIcon} alt="GSN Logo" className="w-[20%]" />
          <h3 className="text-3xl ml-3">GSN</h3>
        </Link>

        <div className="group">
          <Link
            to="/utilities"
            data-testid="cy-utilities-route"
            className="flex items-center justify-center p-4 transition-all duration-300 ease-in-out cursor-pointer hover:bg-white/10 group-hover:blur-sm hover:!blur-none">
            <ApartmentRoundedIcon data-testid="navbar-mui-icons" />
            <h3 className="text-xl ml-2">Utilities</h3>
          </Link>
          <Link
            to="/tariffs"
            data-testid="cy-tariffs-route"
            className="flex items-center justify-center p-4 transition-all duration-300 ease-in-out cursor-pointer hover:bg-white/10 group-hover:blur-sm hover:!blur-none">
            <InsertDriveFileRoundedIcon data-testid="navbar-mui-icons" />
            <h3 className="text-xl ml-2">Tariffs</h3>
          </Link>
        </div>
      </nav>
    </header>
  );
};
