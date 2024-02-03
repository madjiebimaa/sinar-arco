'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

import { login } from '@/actions/auth';
import { mapAuthErrorToMessage } from '@/lib/message';
import { LoginSchema } from '@/lib/schemas';

export default function Page() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const error = await login(values);
    if (!error) {
      toast({
        title: 'Welcome Back!',
        description: "Great news! You've successfully logged in to Sinar Arco.",
      });
    } else {
      const { title, description } = mapAuthErrorToMessage(error.type);
      toast({ variant: 'destructive', title, description });
    }

    form.reset();
  };

  return (
    <main className="flex flex-col h-screen">
      <section className="flex flex-1 flex-col justify-center space-y-10 p-4 md:px-40">
        <h2 className="font-bold text-2xl text-slate-900">
          Sign in to Sinar Arco
        </h2>
        <section className="flex flex-col space-y-8">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-semibold py-8"
          >
            <FcGoogle className="shrink-0 h-6 w-6 mr-4" />
            <span>Sign up with Google</span>
          </Button>
          <div className="relative">
            <Separator />
            <span className="absolute -top-[10px] left-0 right-0 grid place-content-center w-fit px-6 mx-auto text-sm text-slate-400 bg-white z-10">
              or sign in with email
            </span>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-6"
            >
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
                    <FormLabel className="font-bold text-lg">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
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
                Sign In
              </Button>
            </form>
          </Form>
        </section>
        <section className="flex mx-auto">
          <p className="text-sm text-center text-slate-600">
            <span>{"Don't have an account? "}</span>
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </p>
        </section>
      </section>
    </main>
  );
}
