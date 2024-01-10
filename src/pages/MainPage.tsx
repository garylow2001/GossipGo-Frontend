import React from 'react'
import PageHeader from '../layouts/PageHeader'
import ThreadListView from '../sections/ThreadListView'
import Sidebar from '../layouts/Sidebar'
import MainLayout from '../layouts/MainLayout'

const MainPage = () => {
    return (
        <MainLayout>
            <div className='bg-gray-300'>
                CATEGORIES
            </div>
            <div className='flex-1 overflow-auto'>
                <ThreadListView />
            </div>
        </MainLayout>
    )
}

export default MainPage
