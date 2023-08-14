import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { TLeaderboardData } from '../../typings';
import { round } from '../helpers';

const columnHelper = createColumnHelper<LeaderboardData>();

const COLUMNS: ColumnDef<TLeaderboardData>[] = [
  // @ts-ignore
  columnHelper.accessor('name', {
    cell: (info) => (
      <p className="font-customSans font-semibold">{info.getValue()}</p>
    ),
    footer: (info) => info.column.id,
  }),
  // @ts-ignore
  columnHelper.accessor('score', {
    header: 'Score (lower is better!)',
    cell: ({ getValue }) => {
      const score = Number.parseFloat(getValue());
      let formattedScore = 0;
      if (score > 1) {
        formattedScore = round(score, 4);
      } else {
        formattedScore = round(score * 1000, 2);
      }

      return (
        <p className="font-customSans font-bold">
          {formattedScore}{' '}
          <span className="text-xs text-sky-700 dark:text-sky-300 font-bold">
            {score > 1 ? 'km' : 'm'}
          </span>
        </p>
      );
    },
  }),
  // @ts-ignore
  columnHelper.accessor('country', {
    cell: (info) => <p className="uppercase">{info.getValue()}</p>,
  }),
];

export default COLUMNS;
