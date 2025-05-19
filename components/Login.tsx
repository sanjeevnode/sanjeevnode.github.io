'use client';

import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Github } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button';

export default function AdminLogin() {
    const searchParams = useSearchParams();
    const session = useSession();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';

    useEffect(() => {
        if (session?.status === "authenticated") {
            console.log("authenticated")
            router.push("/admin/dashboard");
        }
    }, [session?.status, router])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <Card className="w-[280px]">
                <CardHeader>
                    <CardTitle className='text-xl text-center'>Admin Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className='w-full' onClick={() => signIn('github', { callbackUrl })}>
                        <Github className="inline mr-2" />
                        Sign in with GitHub
                    </Button>
                </CardContent>
            </Card>

        </div>
    );
}
