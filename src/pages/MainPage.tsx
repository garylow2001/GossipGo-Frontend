import ThreadListView from '../sections/ThreadListView'
import MainLayout from '../layouts/MainLayout'

const MainPage = () => {
    return (
        <MainLayout>
            <div className=''>
                <ThreadListView />
            </div>
        </MainLayout>
    )
}

export default MainPage
