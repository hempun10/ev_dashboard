import Heading from '@/components/shared/heading';
import { useUsers } from '@/hooks/useUsers';
import { UserDetails } from '@/types/user';
import React, { useEffect, useState } from 'react';
import { stationManagerColumn, StationMangers } from './components/column';
import DataTable from '@/components/shared/data-table';
import { Table } from '@/components/ui/table';
import { Tables } from '@/components/shared/table';
import { Button } from '@/components/ui/button';
import ManagerForm from './components/ManagerForm';

const StationManager = () => {
  const [stationManagers, setStationManagers] = useState<UserDetails[]>([]);
  const { data, isLoading, refetch } = useUsers();
  const [formattedStationManagerData, setFormattedStationManagerData] =
    useState<StationMangers[]>([]);
  const [modleOpen, setModleOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setStationManagers(
        data.filter((user) => user.userType === 'StationManager')
      );
      if (stationManagers.length > 0) {
        const formattedData = stationManagers.map((stationManager) => {
          return {
            id: stationManager.UserID,
            username: stationManager.username,
            email: stationManager.email,
            address: stationManager.address!
          };
        });
        setFormattedStationManagerData(formattedData);
      }
    }
  }, [data, stationManagers]);
  return (
    <div className=" mx-auto my-5 max-w-7xl">
      <div className=" flex justify-between">
        <Heading
          title="Station Manager"
          description="Manage all the stations managers"
        />
        <Button
          onClick={() => {
            setModleOpen(true);
          }}
        >
          Add Station Manager
        </Button>
      </div>
      <Tables
        data={formattedStationManagerData}
        columns={stationManagerColumn}
        isLoading={isLoading}
        refetch={refetch}
        searchKey="username"
      />
      {modleOpen && (
        <ManagerForm
          isOpen={modleOpen}
          onClose={() => {
            setModleOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default StationManager;
