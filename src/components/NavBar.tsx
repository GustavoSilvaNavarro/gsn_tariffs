import { Link } from 'react-router';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import gsnIcon from '@/assets/edf_logo.png';

export const NavBar = () => {
  return (
    <header className="h-screen flex-[0.2_1_0%] min-w-[280px] bg-[#020712] text-white">
      <nav className="py-4">
        <Link to="/" className="flex items-center justify-center p-4 cursor-pointer mb-2">
          <img src={gsnIcon} alt="Logo" className="w-[20%]" />
          <h3 className="text-3xl ml-3">GSN</h3>
        </Link>

        <div>
          <Link
            to="/utilities"
            className="flex items-center justify-center p-4 transition-all duration-300 ease-in-out cursor-pointer hover:bg-white/10 group-hover:blur-sm hover:!blur-none">
            <ApartmentRoundedIcon />
            <h3 className="text-xl ml-2">Utilities</h3>
          </Link>
          <Link
            to="/tariffs"
            className="flex items-center justify-center p-4 transition-all duration-300 ease-in-out cursor-pointer hover:bg-white/10 group-hover:blur-sm hover:!blur-none">
            <InsertDriveFileRoundedIcon />
            <h3 className="text-xl ml-2">Tariffs</h3>
          </Link>
        </div>
      </nav>
    </header>
  );
};
