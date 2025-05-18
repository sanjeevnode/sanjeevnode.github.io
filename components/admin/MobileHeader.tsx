import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Hamburger } from 'lucide-react'

function MobileHeader() {
    return (
        <div className='md:hidden flex flex-row shadow-md bg-white text-black p-4 gap-x-2 fixed inset-0 w-full h-14 z-50 items-center'>
            <SidebarTrigger className='md:hidden'>
                <Hamburger className="h-6 w-6 text-black" />
            </SidebarTrigger>
            <h1 className='text-lg font-semibold'>Admin Dashboard</h1>
        </div>
    )
}

export default MobileHeader