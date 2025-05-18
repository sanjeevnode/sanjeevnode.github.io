import { Settings } from 'lucide-react';
import React from 'react'

type EmptyProps = {
    title: string;
}

function Empty({ title }: EmptyProps) {
    return (
        <div id={title} className='bg-white dark:bg-gray-900 h-[50vh] w-full flex  flex-col items-center justify-center gap-4 '>
            <span className='text-3xl font-bold text-gray-800 dark:text-white capitalize'>{title}</span>
            <p className='text-gray-600 dark:text-gray-400 mt-4'> This Section is in progress, please come back later </p>
            <Settings
                className='text-gray-800 dark:text-gray-200 animate-spin'
                style={{ animationDuration: '2s' }}
                size={40}
            />
        </div>
    )
}

export default Empty
