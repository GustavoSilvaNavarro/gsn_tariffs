import { useState } from 'react';
import { ulid } from 'ulidx';

import type { ChargeType } from '@/interfaces';

type IProps = {
  rates: Array<ChargeType> | null;
};

export const TouGroup = ({ rates }: IProps) => {
  const [energy, setEnergy] = useState('CONSUMPTION_BASED');
  console.log(rates);

  if (!rates) {
    return (
      <div>
        <p>Time of use can not be displayed, please check!!!</p>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="flex justify-end">
        <select
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-[300px] p-2.5">
          <option value="CONSUMPTION_BASED">Consumption</option>
          <option value="DEMAND_BASED">Demand</option>
        </select>
      </div>

      <div className="my-6">
        {rates.map((rate) =>
          rate.name === energy ? (
            <div
              key={ulid()}
              className="block bg-white border p-6 border-gray-200 mb-4 rounded-lg shadow hover:bg-gray-100">
              {rate.seasons.map((season) => (
                <div key={ulid()}>
                  <h3 className="text-2xl font-thin bg-shine-blue p-2 mb-2 text-white rounded">{season.name}</h3>
                  <div className="flex items-center justify-around">
                    {season.tous.map((tou) => (
                      <div key={ulid()}>
                        <h4 className="text-lg font-bold">{tou.name}</h4>
                        <p>
                          $ {tou.price.toPrecision(6)} {energy === 'CONSUMPTION_BASED' ? '/ kWh' : '/ kW'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
