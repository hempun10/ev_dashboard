'use client';
import { AlertModal } from '@/components/ui/alertModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useLoading } from '@/hooks/useLoading';
import { useModal } from '@/hooks/useModal';
import { EditIcon, MoreHorizontal, Trash } from 'lucide-react';
import React, { useState } from 'react';
import StationForm from './ChargerForm';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '@/lib/utils';
import { ChargerColumn } from './column';

const CellAction = ({ data }: { data: ChargerColumn }) => {
  const { isLoading, setIsLoading } = useLoading();
  const queryClient = useQueryClient();
  const { isOpen, setIsOpen } = useModal();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { toast } = useToast();

  const handleModelClose = () => {
    setIsModelOpen(false);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(baseUrl + `/stations/${data.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ev_token')}`
        }
      });
      if (res.data.message === 'Station deleted successfully') {
        queryClient.invalidateQueries({
          queryKey: ['stations']
        });
        toast({
          title: 'Success',
          description: 'Station deleted successfully',
          variant: 'default'
        });
      }
      toast({
        title: 'Success',
        description: 'Station deleted successfully',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete station',
        variant: 'destructive'
      });
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        loading={isLoading}
        description="This action cannot be undone"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              setIsModelOpen(true);
            }}
          >
            <EditIcon className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className=" text-destructive "
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <StationForm
        isOpen={isModelOpen}
        onClose={handleModelClose}
        initialData={data}
        selectedStationId={data.id}
      />
    </>
  );
};

export default CellAction;
