import { useGetSingleUtilityBasedOnLseIdQuery } from '@/state/genability/genabilitySlice';

type UtilityProps = {
  lseId: string;
};

export const Utility = ({ lseId }: UtilityProps) => {
  const { data, isLoading, isError } = useGetSingleUtilityBasedOnLseIdQuery(lseId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error...</div>;
  }

  return (
    <section className="flex-1 h-screen overflow-auto">
      <div className="bg-[#f5f5f5] py-4 px-6">
        <h1 className="text-2xl">
          {data?.results[0].name} ({data?.results[0].lseCode})
        </h1>
        <a
          className="font-thin text-sky-700 hover:underline"
          href={data?.results[0].websiteHome}
          target="_blank"
          rel="noreferrer">
          {data?.results[0].websiteHome}
        </a>
      </div>
    </section>
  );
};
