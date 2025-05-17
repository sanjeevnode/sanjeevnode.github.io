'use client';

import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function AdminLogin() {
    const searchParams = useSearchParams();
    const session = useSession();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl') || '/admin/cms';

    useEffect(() => {
        if (session?.status === "authenticated") {
            console.log("authenticated")
            router.push("/admin/cms");
        }
    }, [session?.status, router])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-xl mb-4">Admin Login</h2>
            <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={() => signIn('github', { callbackUrl })}
            >
                Sign in with GitHub
            </button>
        </div>
    );
}
