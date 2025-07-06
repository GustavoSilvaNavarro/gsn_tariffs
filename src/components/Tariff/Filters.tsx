import { ulid } from 'ulidx';

import type { ITariffProperties, InitialStateProps } from '@/interfaces';

type IProps = {
  filters: Array<ITariffProperties>;
  filterStates: InitialStateProps;
  setFilterStates: React.Dispatch<React.SetStateAction<InitialStateProps>>;
};

export const Filters = ({ filters, filterStates, setFilterStates }: IProps) => {
  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;

    setFilterStates({ ...filterStates, [name]: { ...filterStates[name], value } });
  };

  return (
    <div className="grid grid-cols-3 p-4 rounded bg-[#111927]">
      {filters.map((filter) => (
        <div key={ulid()} className="mb-6 p-2">
          <label htmlFor={filter.keyName} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {filter.displayName}
          </label>
          <select
            id={filter.keyName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            name={filter.keyName}
            value={filterStates[filter.keyName].value}>
            <option value=""></option>
            {filter.choices?.map((choice) => (
              <option key={ulid()} value={choice.displayValue}>
                {choice.displayValue}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};
