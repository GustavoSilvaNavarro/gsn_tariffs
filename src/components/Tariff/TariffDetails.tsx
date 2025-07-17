import { useState } from 'react';
import { useGetSingleTariffByMTIDQuery, useGetTariffHistoryQuery } from '@/state/genability/genabilitySlice';
import { returnNowDateFormatted, a11yProps } from '@/utils';
import { FlashOn, AvTimer } from '@mui/icons-material';
import { Box, Tabs, Tab } from '@mui/material';
import { ulid } from 'ulidx';
import { Details } from './Details';
import { OverviewTariff } from './OverViewPrices';
import { TabPanel } from '../Tabs/TabPanel';

type ITariffProps = {
  masterTariffId: string;
};

export const TariffDetails = ({ masterTariffId }: ITariffProps) => {
  const [value, setValue] = useState(0);
  const [dateEffective, setDateEffective] = useState(returnNowDateFormatted());
  const {
    data: tariffData,
    isLoading: tariffIsLoading,
    isError: tariffError,
  } = useGetSingleTariffByMTIDQuery({ masterTariffId, date: dateEffective });
  const { data: tariffHistory, isLoading: tariffHistoryLoading } = useGetTariffHistoryQuery({ masterTariffId });

  if (tariffIsLoading || tariffHistoryLoading) {
    return <div>Loading...</div>;
  }

  if (tariffError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      {tariffData && tariffData.results.length ? (
        <>
          <div className="bg-[#333] py-2 px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-thin text-white">
                {tariffData.results[0]?.tariffCode} | {tariffData.results[0]?.tariffName}
              </h2>
              <p className="text-white">Currency: {tariffData.results[0]?.currency}</p>
            </div>
            <div className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-4">
                <div className="text-[#ffc600] text-xs flex items-center">
                  <FlashOn />
                  <span>{tariffData.results[0].lseName}</span>
                </div>
                <div className="text-white">
                  <span className="mr-1">MTID:</span>
                  <span>{tariffData.results[0].masterTariffId}</span>
                </div>
                <div className="text-white">
                  <span className="mr-1">Tariff ID:</span>
                  <span>{tariffData.results[0].tariffId}</span>
                </div>
              </div>
              <div className="text-white/40 flex items-center gap-1 border text-[14px] border-gray-400 p-1 rounded hover:bg-white/10 hover:text-white">
                <AvTimer />
                <p>Effective Date</p>
                <select
                  className="bg-transparent cursor-pointer"
                  onChange={(e) => setDateEffective(e.target.value)}
                  onBlur={(e) => setDateEffective(e.target.value)}
                  value={tariffData.results[0].effectiveDate}>
                  {tariffHistory
                    ? tariffHistory.results[0].tariffVersions.map((dates) => (
                        <option key={ulid()} value={dates.effectiveDate}>
                          {dates.effectiveDate}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </div>
          </div>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={(_, value: number) => setValue(value)} aria-label="basic tabs example">
                <Tab label="Rates" {...a11yProps(0)} />
                <Tab label="Overview" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Details tariff={tariffData.results[0]} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OverviewTariff mtidInfo={tariffData} />
            </TabPanel>
          </Box>
        </>
      ) : null}
    </div>
  );
};
