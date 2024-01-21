import ThreadListView from '../sections/ThreadListView'
import MainLayout from '../layouts/MainLayout'
import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import CustomButton from '../components/CustomButton'

const MainPage = () => {
    return (
        <MainLayout>
            <div className='flex flex-col items-center justify-center h-full'>
                <PageTitle>Threads Page</PageTitle>
                <Link to="/threads/new-thread">
                    <CustomButton>Create New Thread</CustomButton>
                </Link>
                <ThreadListView />
            </div>
        </MainLayout>
    )
}

export default MainPage
