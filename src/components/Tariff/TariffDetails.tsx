type ITariffProps = {
  masterTariffId: string;
};

export const TariffDetails = ({ masterTariffId }: ITariffProps) => {
  return (
    <div>
      <h1>Hello {masterTariffId}</h1>
    </div>
  );
};
