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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { baseUrl } from '@/lib/utils';
import { useUserDetails } from '@/store/useUserDetails';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ChargerFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChargerId?: number;
  initialData?: ChargerFormValues;
}

const formSchema = z.object({
  Status: z.enum(['Online', 'Offline']),
  ChagerStatus: z.enum(['Booking', 'Available']),
  ChargerType: z.string().optional(),
  Price: z.string().optional(),
  power: z.string().optional()
});

export type ChargerFormValues = z.infer<typeof formSchema>;
const ChargerForm = ({
  isOpen,
  onClose,
  selectedChargerId,
  initialData
}: ChargerFormProps) => {
  const { toast } = useToast();
  const { userDetails } = useUserDetails();
  const queryClient = useQueryClient();
  const [isloading, setIsloading] = useState(false);
  const form = useForm<ChargerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          Status: 'Online',
          ChagerStatus: 'Booking',
          ChargerType: '',
          Price: '',
          power: ''
        }
  });

  const onSubmit = async (values: ChargerFormValues) => {
    try {
      setIsloading(true);

      if (initialData) {
        const res = await axios.put(
          baseUrl + '/Chargers/' + selectedChargerId,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('ev_token')}`
            }
          }
        );

        if (res.data.message === 'Charger updated successfully') {
          queryClient.invalidateQueries({
            queryKey: ['Chargers']
          });
          toast({
            title: 'Success',
            description: res.data.message,
            variant: 'default'
          });
        }
      } else {
        const newData = {
          ...values,
          id: userDetails.UserID
        };
        const res = await axios.post(baseUrl + '/chagers', newData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ev_token')}`
          }
        });
        if (res.data.message === 'Charger added successfully') {
          queryClient.invalidateQueries({
            queryKey: ['chargers']
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

  const title = !initialData ? 'Add Charger' : 'Update Charger';
  const action = !initialData ? 'Add' : 'Update';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
          <div className=" grid grid-cols-2 gap-4">
            <FormField
              name="Status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="ChagerStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charger Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Booking">Booking</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="ChargerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charger Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="Price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="power"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Power</FormLabel>
                  <FormControl>
                    <Input {...field} />
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

export default ChargerForm;
