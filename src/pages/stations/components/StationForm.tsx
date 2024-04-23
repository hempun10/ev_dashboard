import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { baseUrl } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface StationFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStationId?: number;
  initialData?: StationFormValues;
}

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  openingtime: z.string().min(1, 'Opening time is required'),
  chagerType: z.string().min(1, 'Charger type is required'),
  totalPorts: z.number().optional(),
  availablePorts: z.number().optional(),
  rating: z.number().optional(),
  ratingCount: z.number().optional(),
  isAvailable: z.boolean().optional(),
  stationMessage: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  latitude: z.number().multipleOf(0.01).min(1, 'Latitude is required'),
  longitude: z.number().multipleOf(0.01).min(1, 'Longitude is required'),
  code: z.string().min(1, 'Code is required')
  //   image: z.instanceof(File).optional()
});

export type StationFormValues = z.infer<typeof formSchema>;
const StationForm = ({
  isOpen,
  onClose,
  selectedStationId,
  initialData
}: StationFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isloading, setIsloading] = useState(false);
  const form = useForm<StationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: '',
          openingtime: '',
          chagerType: '',
          totalPorts: 0,
          availablePorts: 0,
          rating: 0,
          ratingCount: 0,
          isAvailable: true,
          stationMessage: '',
          address: '',
          latitude: 0,
          longitude: 0,
          code: ''
          // image: null
        }
  });

  const onSubmit = async (values: StationFormValues) => {
    try {
      setIsloading(true);

      if (initialData) {
        const res = await axios.put(
          baseUrl + '/stations/' + selectedStationId,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('ev_token')}`
            }
          }
        );

        if (res.data.message === 'Station updated successfully') {
          queryClient.invalidateQueries({
            queryKey: ['stations']
          });
          toast({
            title: 'Success',
            description: res.data.message,
            variant: 'default'
          });
        }
      } else {
        const res = await axios.post(baseUrl + '/stations', values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ev_token')}`
          }
        });
        if (res.data.message === 'Station created successfully') {
          queryClient.invalidateQueries({
            queryKey: ['stations']
          });
          toast({
            title: 'Success',
            description: res.data.message,
            variant: 'default'
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsloading(false);
      onClose();
    }
  };

  const title = !initialData ? 'Add Station' : 'Update Station';
  const action = !initialData ? 'Add' : 'Update';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
          <div className=" grid grid-cols-3 gap-4">
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="openingtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening time</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="chagerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charger Type</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="totalPorts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total ports</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder=""
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="availablePorts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available ports</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder=""
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder=""
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="ratingCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder=""
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isAvailable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is available</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="stationMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station message</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder=""
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder=""
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <Button className=" w-full">
              {isloading && <Loader className="mr-2 animate-spin" />} {action}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StationForm;
