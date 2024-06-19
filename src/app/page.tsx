'use client';

import { IconTelescope } from '@tabler/icons-react';
import React, { useState, useEffect, FormEvent } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'namanya isi minimal 2 huruf syg:)',
  }),
});

import { IconGhost } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [khodamName, setKhodamName] = useState('');
  const [isSearch, setIsSearch] = useState(true);

  const khodamNames = ['Es kul kul', 'Raja iblis', 'Soto WP']; // Contoh array nama orang tua

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });

  const searchAgain = () => {
    setIsSearch(true);
  };
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const userName = data.name; // Ambil nama dari data
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setIsLoading(true);
    setIsSearch(false);
    setKhodamName('');

    // Simulasi loading selama 2 detik
    setTimeout(() => {
      const randomKhodamName =
        khodamNames[Math.floor(Math.random() * khodamNames.length)];
      setKhodamName(randomKhodamName);
      localStorage.setItem('userName', userName);
      localStorage.setItem('KhodamName', randomKhodamName);
      setIsLoading(false);
    }, 2000);
  }

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedKhodamName = localStorage.getItem('KhodamName');
    if (savedName && savedKhodamName) {
      form.setValue('name', savedName); // Set form value
      setKhodamName(savedKhodamName);
      setIsSearch(false);
    }
  }, [form]);
  return (
    <>
      <main>
        <div className="relative size-64 flex items-center justify-center mx-auto">
          <IconGhost
            className={`${
              isLoading && 'animate-bounce'
            } size-52 relative transition-all`}
          />
        </div>
        <h1 className="text-4xl text-center font-bold mx-auto bg-gradient-to-t from-slate-900 to-black text-transparent bg-clip-text">
          CHECK KHODAM <br /> SMK AMALIAH
        </h1>
        <div className="px-4 w-full mx-auto mt-10">
          {isSearch ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Masukin nama km</FormLabel>
                      <FormControl>
                        <Input placeholder="mas faiz ngawi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  CARI KHODAM <IconTelescope className="ml-1" />
                </Button>
              </form>
            </Form>
          ) : (
            <>
              <div
                className={`${
                  isLoading && 'bg-black border-none'
                } w-full text-2xl text-center font-bold border border-dashed p-4 transition-all rounded-lg`}
              >
                {isLoading && (
                  <div className="flex flex-col justify-center items-center gap-2 py-4">
                    <div className="loader"></div>
                    <div className="text-white">
                      Kita cari khodam punya {form.getValues('name')} ya gaes
                      ya..
                    </div>
                  </div>
                )}
                {khodamName && !isLoading && (
                  <div>
                    Km{' '}
                    <span className="text-red-600">
                      {' '}
                      {form.getValues('name')}
                    </span>
                    , punya khodam{' '}
                    <span className="text-red-600">{khodamName} </span> bjir
                  </div>
                )}
              </div>
              {khodamName && !isLoading && (
                <Button className="w-full mt-10" onClick={searchAgain}>
                  Cari khodam pke nama lain
                </Button>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="border-t w-full h-auto py-6 text-center">
        bikinan{' '}
        <span>
          <Link
            href={'https://just-imann.vercel.app'}
            className="hover:underline font-semibold"
          >
            gw
          </Link>{' '}
        </span>
        yg lagi gabut
      </footer>
    </>
  );
}
