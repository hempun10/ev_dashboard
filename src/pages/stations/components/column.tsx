'use client';
import { Images } from '@/types/station';
import { ColumnDef } from '@tanstack/react-table';
import { Buffer } from 'buffer';
import CellAction from './cell-action';

export type StationColumn = {
  id: number;
  title: string;
  openingtime: string;
  images: Images | null | undefined;
  chagerType: string;
  totalPorts: number;
  availablePorts: number;
  rating: number;
  ratingCount: number;
  isAvailable: boolean;
  address: string;
};

export const stationColumns: ColumnDef<StationColumn>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'title',
    header: 'Station Name'
  },
  {
    accessorKey: 'openingtime',
    header: 'Opening Time'
  },
  {
    accessorKey: 'images',
    header: 'Images',
    cell: ({ row }) => {
      const base = row.original.images?.data;
      if (!base) {
        return null; // Return null if images are null or undefined
      }
      const base64Image = Buffer.from(base).toString('base64');
      return <img src={`data:image/jpeg;base64,${base64Image}`} />;
    }
  },
  {
    accessorKey: 'chagerType',
    header: 'Charger Type'
  },
  {
    accessorKey: 'totalPorts',
    header: 'Total Ports'
  },
  {
    accessorKey: 'availablePorts',
    header: 'Available Ports'
  },
  {
    accessorKey: 'rating',
    header: 'Rating'
  },
  {
    accessorKey: 'ratingCount',
    header: 'Rating Count'
  },
  {
    accessorKey: 'isAvailable',
    header: 'Is Available'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    }
  }
];
