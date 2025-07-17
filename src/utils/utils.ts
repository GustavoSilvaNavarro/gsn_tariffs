import type { InitialStateProps, IRates, ITariffProperties, ITouInfo, IRateAddition } from '@/interfaces';

export const returnNowDateFormatted = () => {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  return `${year}-${month}-${day}`;
};

export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const getTariffTypes = (tariffTypes: string) => {
  return tariffTypes.split(',').map((charge) => {
    const index = charge.indexOf('_');
    if (index > 0) return { name: charge.slice(0, index), origin: charge };
    return { name: charge, origin: charge };
  });
};

export const propertyInitialState = (properties: Array<ITariffProperties>) => {
  const initialState: InitialStateProps = {};

  properties.forEach((property) => {
    if (property.dataType !== 'CHOICE') return;

    if (!initialState[property.keyName]) {
      initialState[property.keyName] = {
        name: property.displayName,
        value: property.propertyValue,
        key: property.keyName,
      };
    }
  });

  return initialState;
};

export const getFiltersProperties = (properties: Array<ITariffProperties>) => {
  return properties.filter((prop) => prop.dataType && prop.dataType === 'CHOICE');
};

export const getPricesPerSeason = (rates: Array<IRates>, filters: InitialStateProps) => {
  // console.log(rates.length);
  const touInfo: ITouInfo = {};
  const restAddition: IRateAddition = {};

  const addRateToTouInfo = (rate: IRates) => {
    if (!rate.timeOfUse) return;
    const { chargeType, timeOfUse, rateBands, applicabilityKey, rateName } = rate;
    const { touType, season, touName } = timeOfUse;

    if (rateName === 'Power Factor Charge' || !season) return;

    const isSuper = touName.toLocaleLowerCase().includes('super');
    const { seasonName } = season;

    const energyPrice = rateBands.reduce((acc, current) => {
      if (applicabilityKey) {
        if (applicabilityKey in filters && current.applicabilityValue === filters[applicabilityKey].value) {
          return acc + current.rateAmount;
        }
      }
      return acc;
    }, 0);

    if (!touInfo[chargeType]) {
      touInfo[chargeType] = {
        name: chargeType,
        seasons: [{ name: seasonName, tous: [{ name: isSuper ? `Super ${touType}` : touType, price: energyPrice }] }],
      };

      return;
    }

    const seasonTariffs = touInfo[chargeType].seasons.find((data) => data.name === seasonName);

    if (!seasonTariffs) {
      touInfo[chargeType].seasons.push({
        name: seasonName,
        tous: [{ name: isSuper ? `Super ${touType}` : touType, price: energyPrice }],
      });

      return;
    }

    const touTariffs = seasonTariffs.tous.find((tou) => tou.name === (isSuper ? `Super ${touType}` : touType));

    if (!touTariffs) {
      seasonTariffs.tous.push({
        name: isSuper ? `Super ${touType}` : touType,
        price: energyPrice,
      });

      return;
    }

    touTariffs.price += energyPrice;
  };

  const computeAddition = (rate: IRates) => {
    const { rateName, chargeType, rateBands, applicabilityKey } = rate;

    if (rateName === 'Power Factor Charge') return;

    const price = rateBands.reduce((acc, current) => {
      if (applicabilityKey) {
        if (applicabilityKey in filters && current.applicabilityValue === filters[applicabilityKey].value) {
          return acc + current.rateAmount;
        }
      }

      if (!applicabilityKey && rateBands.length > 0) {
        return acc + current.rateAmount;
      }
      return acc;
    }, 0);

    const currentData = {} as { name: string; price: number };

    if (rateName.toLowerCase().includes('non-coincident')) {
      currentData.name = 'Non-Coincidental';
      currentData.price = price;
    } else {
      currentData.name = 'Rest';
      currentData.price = price;
    }

    if (!restAddition[chargeType]) {
      restAddition[chargeType] = { nameType: chargeType, categories: [currentData] };
      return;
    }

    const categoriesTariffs = restAddition[chargeType].categories.find((data) => data.name === currentData.name);

    if (categoriesTariffs) {
      categoriesTariffs.price += currentData.price;
    } else {
      restAddition[chargeType].categories.push(currentData);
    }
  };

  const additionBySeason = (rate: IRates) => {
    const { season, applicabilityKey, rateBands, rateName, chargeType } = rate;
    if (rateName === 'Power Factor Charge') return;
    if (!chargeType) return;

    if (!season) return;
    const { seasonName } = season;

    const energyPrice = rateBands.reduce((acc, current) => {
      if (applicabilityKey) {
        if (applicabilityKey in filters && current.applicabilityValue === filters[applicabilityKey].value) {
          return acc + current.rateAmount;
        }
      }
      return acc;
    }, 0);

    if (!touInfo[chargeType]) {
      touInfo[chargeType] = {
        name: chargeType,
        seasons: [{ name: seasonName, tous: [{ name: 'Flat Rate', price: energyPrice }] }],
      };

      return;
    }

    const seasonTariffs = touInfo[chargeType].seasons.find((data) => data.name === seasonName);

    if (!seasonTariffs) {
      touInfo[chargeType].seasons.push({ name: seasonName, tous: [{ name: 'Flat Rate', price: energyPrice }] });

      return;
    }

    const touTariffs = seasonTariffs.tous.find((tou) => tou.name === 'Flat Rate');

    if (!touTariffs) {
      seasonTariffs.tous.push({
        name: 'Flat Rate',
        price: energyPrice,
      });

      return;
    }

    touTariffs.price += energyPrice;
  };

  rates.forEach((rate) => {
    if (rate.timeOfUse && 'timeOfUse' in rate) {
      addRateToTouInfo(rate);
      return;
    }

    if (rate.season) {
      additionBySeason(rate);
      return;
    }

    if (rate.chargeType === 'DEMAND_BASED' || rate.chargeType === 'CONSUMPTION_BASED') {
      computeAddition(rate);
    }
  });

  // console.log(touInfo);
  // console.log(restAddition);

  const otherRates = Object.values(restAddition);
  const result = Object.values(touInfo);

  if (otherRates.length > 0 && result.length > 0) {
    otherRates.forEach((rate) => {
      if (!touInfo[rate.nameType]) return;

      touInfo[rate.nameType].seasons.forEach((tou) => {
        rate.categories.forEach((category) => {
          if (category.name === 'Non-Coincidental') {
            tou.tous.push(category);
            return;
          } else {
            tou.tous.forEach((tou) => (tou.price += category.price));
          }
        });
      });
    });
  }

  if (result.length > 0) return { hasTou: true, data: result };
  else if (otherRates.length > 0) return otherRates;
  else return null;
};
