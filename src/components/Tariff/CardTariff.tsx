import { ulid } from 'ulidx';
import type { IRates } from '@/interfaces';

type IProps = {
  type: { name: string; origin: string };
  rates: Array<IRates>;
};

export const CardTariff = ({ type, rates }: IProps) => {
  return (
    <div className="mb-6 rounded-md shadow-rates-shadow p-4">
      <h2 className="text-2xl font-light text-edf-orange mb-2">{type.name}</h2>
      <div className="grid grid-cols-7">
        <h6 className="font-bold text-center border-b mb-1 col-span-2">Name</h6>
        <h6 className="font-bold text-center border-b mb-1">Rate</h6>
        <h6 className="font-bold text-center border-b mb-1">Period</h6>
        <h6 className="font-bold text-center border-b mb-1">Type</h6>
        <h6 className="font-bold text-center border-b mb-1 col-span-2">Rate Criteria</h6>
      </div>
      {rates.map((rate) =>
        rate.chargeType === type.origin ? (
          <div key={ulid()} className="border-b-2">
            <div className="grid grid-cols-7">
              <div className="col-span-2 text-sm">
                <div>
                  <p>{rate.rateName}</p>
                </div>
              </div>
              <div>
                <div className="text-center text-sm">
                  {rate.rateBands.length > 1 || rate.applicabilityKey ? <p className="opacity-0">rate</p> : null}
                  {rate.rateBands.map((data) => (
                    <p key={ulid()}>
                      {data.rateUnit !== 'PERCENTAGE' ? '$' : null} {data.rateAmount}{' '}
                      {data.rateUnit === 'PERCENTAGE'
                        ? '%'
                        : rate.chargeType === 'CONSUMPTION_BASED'
                          ? '/ kWh'
                          : rate.chargeType === 'DEMAND_BASED'
                            ? '/ kW'
                            : rate.chargeType === 'QUANTITY'
                              ? '/ kW'
                              : null}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-center text-sm">
                  <p className="font-bold">{rate.chargePeriod}</p>
                </div>
              </div>
              <div>
                <div className="text-center text-sm">
                  <p className="font-bold">{rate.transactionType}</p>
                </div>
              </div>
              {rate.applicabilityKey ? (
                <div className="col-span-2">
                  <div className="text-center text-sm">
                    <p className="font-bold text-right mr-8">{rate.applicabilityKey}</p>
                    {rate.rateBands.map((data) => (
                      <p key={ulid()} className="text-right mr-8">
                        {data.applicabilityValue}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
};
