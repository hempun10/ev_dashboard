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
import { useToast } from '@/components/ui/use-toast';
import { baseUrl } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ManagerFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStationId?: number;
  initialValues?: FormValues;
}

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
});

export type FormValues = z.infer<typeof formSchema>;
const ManagerForm = ({
  isOpen,
  onClose,
  selectedStationId,
  initialValues
}: ManagerFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
      ? initialValues
      : {
          username: '',
          email: '',
          password: ''
        }
  });

  const title = selectedStationId
    ? 'Edit Station Manager'
    : 'Add Station Manager';
  const action = selectedStationId ? 'Edit' : 'Add';

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      if (selectedStationId) {
        const res = await axios.put(
          baseUrl + `/stations/${selectedStationId}`,
          data
        );
        if (res.status === 200) {
          toast({
            title: 'Success',
            description: 'Station manager updated successfully',
            variant: 'default'
          });
          onClose();
        }
      } else {
        const newData = {
          ...data,
          userType: 'StationManager'
        };
        const res = await axios.post(baseUrl + '/auth/register', newData);
        if (res.status === 200) {
          toast({
            title: 'Success',
            description: 'Station manager added successfully',
            variant: 'default'
          });
          onClose();
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add station manager',
        variant: 'destructive'
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
          <div className=" grid grid-cols-2 gap-3">
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className=" w-full">
            {isLoading && <Loader className=" h-5 w-5 animate-spin" />}
            {action}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default ManagerForm;
