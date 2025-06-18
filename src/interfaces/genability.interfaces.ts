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
