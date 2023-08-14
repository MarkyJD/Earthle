import { useState, useEffect } from 'react';
import { TLeaderboardData } from '../../typings';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import MOCK_DATA from '../assets/mock-data/MOCK_DATA.json';
import { getLeaderboard } from '../services/firestore';

export default function Leaderboards() {
  const [data, setData] = useState<any>();

  // const fetchData = async (page: number) => {
  //   if (page === 0) {
  //     return MOCK_DATA.slice(0, 20);
  //   }

  //   // Fetch data from firebase
  //   return MOCK_DATA.slice(page * 10, page * 10 + 20);
  // };

  const fetchData = async () => {
    const leaderboard = await getLeaderboard();
    const sortedLeaderboard = leaderboard.sort((a, b) => a.score - b.score);
    setData(sortedLeaderboard);
    return leaderboard;
  };

  useEffect(() => {
    if (!data) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-h-full overflow-y-auto border-2 my-5 mx-5 border-stone-400 dark:border-stone-500 absolute inset-0 rounded-md shadow-md">
      {/* @ts-ignore */}
      {data && <Leaderboard fetchedData={data} fetchData={fetchData} />}
    </div>
  );
}
