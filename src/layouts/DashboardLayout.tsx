import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';

const DashboardLayout = () => {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col border-r border-gray-200 bg-white">
                <div className="flex h-16 items-center px-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
                </div>
                
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    <Link
                        to="/dashboard"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            location.pathname === '/dashboard'
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <svg className="mr-3 h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </Link>
                </nav>

                <div className="flex-shrink-0 border-t border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                            EH
                        </div>
                        <div className="ml-3 flex-1 overflow-hidden">
                            <p className="truncate text-sm font-medium text-gray-900">eve.holt@reqres.in</p>
                            <p className="text-xs font-medium text-gray-500">View profile</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
                    <h2 className="text-lg font-medium text-gray-900">
                        {location.pathname === '/dashboard' ? 'Overview' : 'Dashboard'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={logout}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Sign out
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;