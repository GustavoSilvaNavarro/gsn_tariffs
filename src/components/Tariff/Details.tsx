import type { ITariff } from '@/interfaces/genability.interfaces';
import { getTariffTypes } from '@/utils';
import { CardTariff } from './CardTariff';

type IProps = {
  tariff: ITariff;
};

export const Details = ({ tariff }: IProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl">Tariff Types:</h2>
        {getTariffTypes(tariff.chargeTypes).map((charge) => (
          <span
            key={charge.origin}
            className="text-xl p-2 font-thin border rounded-2xl hover:text-white hover:bg-gsn-black hover:border-gsn-black">
            {charge.name}
          </span>
        ))}
      </div>
      <div className="my-6">
        {getTariffTypes(tariff.chargeTypes).map((type) => (
          <CardTariff key={type.origin} type={type} rates={tariff.rates} />
        ))}
      </div>
    </>
  );
};
