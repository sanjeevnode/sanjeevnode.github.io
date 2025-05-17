'use client';

import { useSession, signOut } from 'next-auth/react';

export default function CMSPage() {
    const { data: session } = useSession();

    if (!session) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl">Welcome to CMS</h1>
            <p>Logged in as {session.user?.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
}
