'use client';
import { Images } from '@/types/station';
import { ColumnDef } from '@tanstack/react-table';
import { Buffer } from 'buffer';
import CellAction from './cell-action';
import { z } from 'zod';

export type ChargerColumn = {
  id: number;
  Status: 'Online' | 'Offline';
  ChagerStatus: 'Booking' | 'Available';
  ChargerType: string;
  Price: string;
  power: string;
};

export const ChargerColumn: ColumnDef<ChargerColumn>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'Status',
    header: 'Status'
  },
  {
    accessorKey: 'openingtime',
    header: 'Opening Time'
  },
  {
    accessorKey: 'ChagerStatus',
    header: 'Charger Status'
  },
  {
    accessorKey: 'ChargerType',
    header: 'Charger Type'
  },
  {
    accessorKey: 'Price',
    header: 'Price'
  },
  {
    accessorKey: 'power',
    header: 'Power'
  }
  // {
  //   accessorKey: 'actions',
  //   header: 'Actions',
  //   cell: ({ row }) => {
  //     return <CellAction data={row.original} />;
  //   }
  // }
];
