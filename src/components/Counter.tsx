import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/state/store';
import { decrement, increment } from '@/state/counter/counterSlice';
// import { fetchUtilityData } from '@/state/tariffs/utilitySlice';
// import { useEffect } from 'react';

export const Counter = () => {
  const counter = useSelector((state: RootState) => state.counter.value);
  // const utilityData = useSelector((state: RootState) => state.utilityData);
  const dispatch = useDispatch<AppDispatch>();

  // console.log(utilityData);

  // useEffect(() => {
  //   dispatch(fetchUtilityData());
  // }, [dispatch]);

  return (
    <div>
      <h2>Count: {counter}</h2>
      <div>
        <button onClick={() => dispatch(increment())} type="button">
          Increase
        </button>
        <button onClick={() => dispatch(decrement())} type="button">
          Decrease
        </button>
      </div>
    </div>
  );
};
