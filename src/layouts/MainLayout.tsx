import React from 'react'
import PageHeader from '../layouts/PageHeader'
import ThreadListView from '../sections/ThreadListView'
import Sidebar from '../layouts/Sidebar'

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen bg-gray-200'>
            <PageHeader />
            <div className='flex flex-1 overflow-hidden grid-cols-[auto,1fr] flex-grow-1'>
                <Sidebar />
                <div className='flex-1 flex flex-col sticky top-0 z-10 pb-4 px-8 pt-6'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainLayout
