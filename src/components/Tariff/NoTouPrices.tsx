import { useState } from 'react';
import { ulid } from 'ulidx';

import type { Categories } from '@/interfaces';

interface IProps {
  rates: {
    nameType: string;
    categories: Array<Categories>;
  }[];
}

export const NoTouPrices = ({ rates }: IProps) => {
  const [charge, setCharge] = useState('CONSUMPTION_BASED');

  console.log(rates);

  return (
    <div className="my-4">
      <div className="flex justify-end">
        <select
          value={charge}
          onChange={(e) => setCharge(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-[300px] p-2.5">
          <option value="CONSUMPTION_BASED">Consumption</option>
          <option value="DEMAND_BASED">Demand</option>
        </select>
      </div>

      <div className="my-6">
        {rates.map((rate) =>
          rate.nameType === charge ? (
            <div
              key={ulid()}
              className="block bg-white border p-6 border-gray-200 mb-4 rounded-lg shadow hover:bg-gray-100">
              {rate.categories.map((category) => (
                <div key={ulid()}>
                  <p>
                    Year Long Energy Charge: $ {category.price.toPrecision(6)}{' '}
                    {charge === 'CONSUMPTION_BASED' ? '/ kWh' : '/ kW'}
                  </p>
                </div>
              ))}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
