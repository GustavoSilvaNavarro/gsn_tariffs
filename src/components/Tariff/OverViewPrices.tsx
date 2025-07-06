import { useState } from 'react';

import { Filters } from './Filters';
import { TouGroup } from './TouGroup';
import { NoTouPrices } from './NoTouPrices';
import type { IResponseTariff, InitialStateProps } from '@/interfaces';
import { propertyInitialState, getPricesPerSeason, getFiltersProperties } from '@/utils';

interface IProps {
  mtidInfo: Omit<IResponseTariff, 'pageCount' | 'pageStart'>;
}

export const OverviewTariff = ({ mtidInfo }: IProps) => {
  const [filterStates, setFilterStates] = useState<InitialStateProps>(
    propertyInitialState(mtidInfo.results[0].properties),
  );

  const prices = getPricesPerSeason(mtidInfo.results[0].rates, filterStates);

  if (!prices) {
    return (
      <div>
        <h2>Please review this case price are not displaying</h2>
      </div>
    );
  }

  return (
    <>
      <Filters
        filters={getFiltersProperties(mtidInfo.results[0].properties)}
        filterStates={filterStates}
        setFilterStates={setFilterStates}
      />
      {'hasTou' in prices ? <TouGroup rates={prices.data} /> : <NoTouPrices rates={prices} />}
    </>
  );
};
