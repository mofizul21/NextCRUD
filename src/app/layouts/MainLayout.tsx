// src/app/layouts/MainLayout.tsx

import React from 'react';
import '../styles/globals.css'; // Import global styles (if needed)
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MainLayoutProps {
    children: React.ReactNode; // To accept children components
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen"> {/* Flex layout for full height */}
            <Header />
            <main className="flex-grow">{children}</main> {/* Main content area */}
            <Footer />
        </div>
    );
};

export default MainLayout;
