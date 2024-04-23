import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import Heading from '@/components/shared/heading';
import { Tables } from '@/components/shared/table';
import { Button } from '@/components/ui/button';
import { useStations } from '@/hooks/useStations';
import React, { useEffect, useState } from 'react';
import { StationColumn, stationColumns } from './components/column';
import { Station } from '@/types/station';
import { useModal } from '@/hooks/useModal';
import StationForm from './components/StationForm';
import { returnTrueOrFalse } from '@/lib/utils';

const Chargers = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [formmatedStationsData, setFormmatedStationsData] = useState<
    StationColumn[]
  >([]);
  const { data, isLoading, refetch } = useStations();

  useEffect(() => {
    if (data) {
      setStations(data.randomStation);
      if (stations) {
        const formattedData = stations.map((station) => {
          return {
            id: station.id,
            title: station.title,
            openingtime: station.openingtime,
            images: station.images,
            chargerType: station.chagerType,
            totalPorts: station.totalPorts,
            availablePorts: station.availablePorts,
            rating: station.rating,
            ratingCount: station.ratingCount,
            isAvailable: returnTrueOrFalse(station.isAvailable),
            address: station.address
          };
        });
        setFormmatedStationsData(formattedData);
      }
    }
  }, [data, stations]);

  return (
    <div className=" mx-auto my-7 max-w-7xl">
      <div className=" flex justify-between">
        <Heading
          className=" space-y-2"
          title="Stations"
          description="Manage all your stations"
        />
        <Button
          className="mt-4"
          onClick={() => {
            setModelOpen(true);
          }}
        >
          Add Station
        </Button>
      </div>
      <Tables
        data={formmatedStationsData}
        columns={stationColumns}
        searchKey="title"
        isLoading={isLoading}
        refetch={refetch}
      />
      {modelOpen && (
        <StationForm isOpen={modelOpen} onClose={() => setModelOpen(false)} />
      )}
    </div>
  );
};

export default Chargers;
