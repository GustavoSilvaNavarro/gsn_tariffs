import { useParams } from 'react-router';
import { TariffDetails } from '@/components/Tariff/TariffDetails';

export const Tariff = () => {
  const { masterTariffId } = useParams<{ masterTariffId: string }>();

  return (
    <div className="flex-[0.8_1_0%] h-screen">
      {masterTariffId ? (
        <TariffDetails masterTariffId={masterTariffId} />
      ) : (
        <div>
          <h1>Sorry, at this moment we can not display data related to this tariff</h1>
        </div>
      )}
    </div>
  );
};
