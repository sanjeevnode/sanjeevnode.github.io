import Loading from '@/components/Loading';
import AdminLogin from '@/components/Login';
import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <AdminLogin />
        </Suspense>
    );
}
