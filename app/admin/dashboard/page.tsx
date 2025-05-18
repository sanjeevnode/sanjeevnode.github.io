'use client';

import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';

export default function CMSPage() {
    const { data: session } = useSession();


    return (
        <Suspense fallback={<Loading />}>
            <div className='flex flex-col  pt-4 px-4'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <h1 className='text-2xl font-bold'>Welcome to the Admin Dashboard</h1>
                    <p className='text-lg'>You are logged in as {session?.user?.name}</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 mt-4'>
                    <p className='text-lg'>This is a placeholder for your admin dashboard content.</p>
                </div>
            </div>
        </Suspense>

    );
}
