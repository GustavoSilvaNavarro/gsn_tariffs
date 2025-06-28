import type { Nullable } from './common';

export type Utility = {
  lseId: number;
  name: string;
  websiteHome: string;
  lseCode: string;
  totalCustomers: number;
  code: string;
};

export type RespLses = {
  status: string;
  count: number;
  type: string;
  results: Array<Utility>;
  pageCount: number;
  pageStart: number;
};

// ! Tariff types
type BasicTariff = {
  masterTariffId: number;
  tariffCode: string;
  tariffName: string;
  lseId: number;
  serviceType: string;
  customerClass: string;
};

type BasicResponse = {
  status: string;
  count: number;
  type: string;
};

export type ITariff = BasicTariff & {
  tariffId: number;
  lseName: string;
  lseCode: string;
  currency: string;
  tariffType: string;
  effectiveDate: string;
  timeZone: string;
  chargeTypes: string; //! Important
  maxMonthlyDemand: number;
  hasNetMetering: boolean;
  properties: Array<ITariffProperties>;
  rates: Array<IRates>;
};

type IChoices = {
  displayValue: string; //! Super important
  value: string;
};

export type ITariffProperties = {
  keyName: string;
  period: string;
  displayName: string; //! Super important
  dataType: string; //! important for filtering
  propertyValue: string; //? Could be something to consider
  family: string;
  keyspace: string;
  description: string;
  choices?: Array<IChoices>;
};

export type IRates = {
  tariffRateId: number;
  masterTariffRateId: number;
  applicabilityKey?: string; //? Possibly important
  quantityKey?: string; //? Check if there is reactive energy
  tariffId: number;
  tariffSequenceNumber: number;
  rateGroupName: string;
  rateName: string; //! important
  chargeType: string; //! Important
  tariffBookRateName: string;
  chargeClass: string;
  chargePeriod: string; //! Important
  transactionType: string;
  variableRateKey?: string; //? Check if the price is variable
  rateBands: Array<IRateBands>;
  timeOfUse?: ITimeOfUse;
  season?: Season;
};

type ITimeOfUse = {
  touGroupId: number;
  touName: string;
  touType: string; //! important
  season: Nullable<Season>;
};

type Season = {
  seasonGroupId: number;
  seasonName: string;
};

export type IRateBands = {
  tariffRateBandId: number;
  tariffRateId: number;
  rateSequenceNumber: number;
  rateUnit: string; //? Could be important
  rateAmount: number; //! Important is the price
  applicabilityValue?: string; //! Connection type
};

export type IResponseTariff = BasicResponse & {
  status: string;
  count: number;
  type: string;
  results: Array<ITariff>;
  pageCount: number;
  pageStart: number;
};

type ITariffHistory = BasicTariff & {
  initialEffectiveDate: string;
  tariffVersions: Array<ITariffVersions>;
};

type ITariffVersions = {
  tariffId: number;
  effectiveDate: string;
};

export type IResponseHistory = BasicResponse & {
  results: Array<ITariffHistory>;
};
