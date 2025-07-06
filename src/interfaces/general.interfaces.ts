export type InitialState = {
  name: string;
  value: string;
  key: string;
};

export type InitialStateProps = {
  [property: string]: InitialState;
};

type ITou = {
  name: string;
  price: number;
};

type ISeason = {
  name: string;
  tous: Array<ITou>;
};

export type ChargeType = {
  name: string;
  seasons: Array<ISeason>;
};

export type ITouInfo = {
  [key: string]: ChargeType;
};

export type Categories = {
  name: string;
  price: number;
};

export type IRateAddition = {
  [chargeType: string]: {
    nameType: string;
    categories: Array<Categories>;
  };
};
