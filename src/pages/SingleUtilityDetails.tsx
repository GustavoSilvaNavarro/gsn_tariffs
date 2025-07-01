import { useParams } from 'react-router';
import { Utility } from '@/components/Utility';

export const SingleUtilityDetails = () => {
  const { lseId } = useParams<{ lseId: string }>();

  return (
    <div className="flex-[0.8_1_0%] h-screen">
      {lseId ? (
        <Utility lseId={lseId} />
      ) : (
        <div>
          <h1>Sorry, at this moment we can not display data related to this utility</h1>
        </div>
      )}
    </div>
  );
};
