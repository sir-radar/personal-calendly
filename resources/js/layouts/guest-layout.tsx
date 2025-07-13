import React from 'react';

const GuestLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="guest-layout">
            <div className="container mx-auto p-4">{children}</div>
        </div>
    );
};

export default GuestLayout;
