import { useState, useEffect } from 'react';
import { LeaderboardData } from '../../typings';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import MOCK_DATA from '../assets/mock-data/MOCK_DATA.json';

export default function Leaderboards() {
  const [data, setData] = useState<[LeaderboardData]>();

  const fetchData = (page: number) => {
    if (page === 0) {
      return MOCK_DATA.slice(0, 20);
    }

    // Fetch data from firebase
    return MOCK_DATA.slice(page * 10, page * 10 + 20);
  };

  useEffect(() => {
    if (!data) {
      const result = fetchData(0);
      // @ts-ignore
      setData(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    data && (
      <div className="max-h-full overflow-y-scroll border-2 my-5 mx-5 border-stone-400 dark:border-stone-500 absolute inset-0 rounded-md shadow-md">
        {/* @ts-ignore */}
        <Leaderboard fetchedData={data} fetchData={fetchData} />
      </div>
    )
  );
}
