/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import { TLeaderboardData } from '../../../typings';
import COLUMNS from '../../constants/columns';

interface LeaderboardProps {
  fetchedData: [TLeaderboardData];
  page: number;
  fetchData: (page: number) => void;
}

export default function Leaderboard({
  fetchedData,
  page,
  fetchData,
}: LeaderboardProps) {
  const [data, setData] = useState<[TLeaderboardData]>(() => [...fetchedData]);
  const columns = COLUMNS;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-full w-full">
      <table className="w-full h-full text-base text-left">
        <thead className="sticky top-0 text-sm uppercase text-stone-100 bg-emerald-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th scope="col" className="px-2 py-3 md:px-6" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="bg-stone-100 dark:bg-stone-800 border-b border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="px-2 py-4 md:px-6" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot className="sticky bottom-0 text-sm bg-emerald-800 text-stone-100 uppercase">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th className="px-2 py-3 md:px-6" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
