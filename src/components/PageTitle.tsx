import React from 'react';

interface PageTitleProps {
    children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
    return <h2 className='text-lg font-bold mb-4'>{children}</h2>;
};

export default PageTitle;
