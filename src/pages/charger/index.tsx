import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import Heading from '@/components/shared/heading';
import { Tables } from '@/components/shared/table';
import { Button } from '@/components/ui/button';
import { useStations } from '@/hooks/useStations';
import React, { useEffect, useState } from 'react';
import { returnTrueOrFalse } from '@/lib/utils';
import { ChargerColumn } from './components/column';
import { Charger } from '@/types/charger';
import ChargerForm from './components/ChargerForm';
import { useChargers } from '@/hooks/useChargers';

const Chargers = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [formmatedStationsData, setFormmatedStationsData] = useState<
    ChargerColumn[]
  >([]);
  const { data, isLoading, refetch } = useChargers();

  useEffect(() => {
    if (data) {
      setChargers(data.chargers);
      if (chargers) {
        const formattedData = chargers.map((charger) => {
          return {
            id: charger.ChargerID,
            ChargerType: charger.ChargerType,
            Status: charger.Status as 'Online' | 'Offline',
            ChagerStatus: charger.ChagerStatus as 'Booking' | 'Available',
            Price: charger.Price,
            power: charger.power
          };
        });
        setFormmatedStationsData(formattedData);
      }
    }
  }, [data, chargers]);

  return (
    <div className=" mx-auto my-7 max-w-7xl">
      <div className=" flex justify-between">
        <Heading
          className=" space-y-2"
          title="Chargers"
          description="Manage all your chargers"
        />
        <Button
          className="mt-4"
          onClick={() => {
            setModelOpen(true);
          }}
        >
          Add Charger
        </Button>
      </div>
      <Tables
        data={formmatedStationsData}
        columns={ChargerColumn}
        searchKey="title"
        isLoading={isLoading}
        refetch={refetch}
      />
      {modelOpen && (
        <ChargerForm isOpen={modelOpen} onClose={() => setModelOpen(false)} />
      )}
    </div>
  );
};

export default Chargers;
