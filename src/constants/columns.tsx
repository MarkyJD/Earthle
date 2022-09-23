import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { LeaderboardData } from '../../typings';

const columnHelper = createColumnHelper<LeaderboardData>();

const COLUMNS: ColumnDef<LeaderboardData>[] = [
  // @ts-ignore
  columnHelper.accessor('name', {
    cell: (info) => <p>{info.getValue()}</p>,
    footer: (info) => info.column.id,
  }),
  // @ts-ignore
  columnHelper.accessor('country', {
    cell: (info) => <p>{info.getValue()}</p>,
  }),
  // @ts-ignore
  columnHelper.accessor('score', {
    cell: (info) => <p>{info.getValue()}</p>,
  }),
  // @ts-ignore
  columnHelper.accessor('createdAt', {
    cell: (info) => <p>{new Date(info.getValue()).toDateString()}</p>,
  }),
];

export default COLUMNS;
