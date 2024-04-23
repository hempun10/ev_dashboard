import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type StationMangers = {
  id: number;
  username: string;
  email: string;
  address: string;
};

export const stationManagerColumn: ColumnDef<StationMangers>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'username',
    header: 'Username'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    }
  }
];
