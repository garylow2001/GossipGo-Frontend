import ThreadListView from '../sections/ThreadListView'
import MainLayout from '../layouts/MainLayout'

const MainPage = () => {
    return (
        <MainLayout>
            <div className='bg-gray-300'>
                CATEGORIES
            </div>
            <div className=''>
                <ThreadListView />
            </div>
        </MainLayout>
    )
}

export default MainPage
