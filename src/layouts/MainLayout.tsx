import React from 'react'
import PageHeader from '../layouts/PageHeader'
import Sidebar from '../layouts/Sidebar'

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className='min-h-screen flex flex-col relative'>
            <PageHeader />
            <div className='flex flex-1 overflow-hidden'>
                <Sidebar />
                <div className='flex-1 overflow-y-auto px-8 py-4 ml-32'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainLayout
