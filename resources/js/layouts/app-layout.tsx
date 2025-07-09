import { Toaster } from '@/components/ui/sonner';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <div className="h-max">
        {children}
        <Toaster />
    </div>
);
