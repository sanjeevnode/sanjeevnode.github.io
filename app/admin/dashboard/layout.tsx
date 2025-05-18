
import DashboardSidebar from '@/components/admin/DashboardSidebar'
import MobileHeader from '@/components/admin/MobileHeader'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

function DashboardLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className='flex-1 relative'>
                <MobileHeader />
                <div className='w-full h-full pt-14 md:pt-0'>
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout
