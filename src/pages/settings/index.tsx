import Heading from '@/components/shared/heading';
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
import { useToast } from '@/components/ui/use-toast';
import { useLoading } from '@/hooks/useLoading';
import { useLogout } from '@/hooks/useLogout';
import { baseUrl } from '@/lib/utils';
import { useUserDetails } from '@/store/useUserDetails';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid e-mail address' }),
  password: z.string().min(1, { message: 'Password is required' })
});

type FormValues = z.infer<typeof formSchema>;
const SettingsPage = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { toast } = useToast();
  const { userDetails } = useUserDetails();
  const { logout } = useLogout();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userDetails?.username,
      email: userDetails?.email
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        baseUrl + `/users/${userDetails?.UserID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ev_token')}`
          }
        }
      );

      if (res.status === 200) {
        toast({
          title: 'Success',
          description: 'User details updated successfully',
          variant: 'default'
        });
      }

      if (res.status === 401) {
        toast({
          title: 'Error',
          description: 'Unauthorized',
          variant: 'destructive'
        });
        logout();
      }

      if (res.status === 500) {
        toast({
          title: 'Error',
          description: 'Internal server error',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Uh oh! Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" mx-auto mt-5 max-w-7xl space-y-4">
      <Heading
        title="Settings"
        description="Manage your account settings and set e-mail preferences."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-3 gap-3">
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User name</FormLabel>
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
          </div>

          <div
            className="
            mt-5 flex justify-end
          "
          >
            <Button type="submit" className=" w-20 ">
              {isLoading && <Loader size={20} className=" animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPage;
