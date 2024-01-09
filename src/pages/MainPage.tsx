import React from 'react'
import PageHeader from '../layouts/PageHeader'
import ThreadListView from '../components/ThreadListView'
import Sidebar from '../layouts/Sidebar'

const MainPage = () => {
    return (
        <div>
            <PageHeader />
            <div className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
                <Sidebar />
                <div className='sticky top-0 bg-white z-10 pb-4 px-8'>
                    <div className='bg-gray-300'>
                        CATEGORIES
                    </div>
                    <ThreadListView />
                </div>
            </div>
        </div>
    )
}

export default MainPage
