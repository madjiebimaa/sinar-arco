'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { register } from '@/actions/auth';
import { mapAuthErrorToMessage } from '@/lib/message';
import { RegisterSchema } from '@/lib/schemas';

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    const error = await register(values);
    if (!error) {
      toast({
        title: 'Account Created Successfully!',
        description:
          'Congratulations! Your account has been successfully created. Welcome to Sinar Arco,',
      });
    } else {
      const { title, description } = mapAuthErrorToMessage(error.type);
      toast({ variant: 'destructive', title, description });
    }

    form.reset();
  };

  return (
    <main className="flex flex-col h-screen">
      <div className="flex p-4">
        <Button
          variant="outline"
          className="h-fit w-fit p-2 rounded-full"
          onClick={() => router.back()}
        >
          <ChevronLeft className="shrink-0 h-6 w-6 text-slate-900" />
        </Button>
      </div>
      <section className="flex flex-1 flex-col justify-center space-y-10 p-4 md:px-40">
        <h2 className="font-bold text-2xl text-slate-900">
          Sign up to Sinar Arco
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="off"
                      className="py-6 px-4 text-base rounded-xl"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="off"
                      className="py-6 px-4 text-base rounded-xl"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="6+ characters"
                      className="py-6 px-4 text-base rounded-xl"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-full font-semibold py-8"
              disabled={!form.formState.isValid}
            >
              Create Account
            </Button>
          </form>
        </Form>
        <section className="flex mx-auto">
          <p className="text-sm text-center text-slate-600">
            <span>Already have an account? </span>
            <Link href="/auth/signin" className="underline">
              Sign in
            </Link>
          </p>
        </section>
      </section>
    </main>
  );
}
