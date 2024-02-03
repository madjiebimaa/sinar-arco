import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <main className="flex flex-col h-screen">
      <section className="flex flex-1 flex-col justify-center space-y-10 p-4 md:px-40">
        <h2 className="font-bold text-2xl text-slate-900">
          Sign up to Sinar Arco
        </h2>
        <section className="flex flex-col space-y-8">
          <Button size="lg" className="rounded-full font-semibold py-8">
            <FcGoogle className="shrink-0 h-6 w-6 mr-4" />
            <span>Sign up with Google</span>
          </Button>
          <div className="relative">
            <Separator />
            <span className="absolute -top-[10px] left-0 right-0 grid place-content-center w-fit px-6 mx-auto text-sm text-slate-400 bg-white z-10">
              or
            </span>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-semibold py-8"
          >
            <Link href="/auth/signup/new">Continue with email</Link>
          </Button>
        </section>
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
