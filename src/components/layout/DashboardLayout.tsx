import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {
  HomeIcon,
  ShoppingBagIcon,
  FolderIcon,
  PhotoIcon,
  NewspaperIcon,
  BellIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Products', href: '/products', icon: ShoppingBagIcon },
  { name: 'Categories', href: '/categories', icon: FolderIcon },
  { name: 'Media', href: '/media', icon: PhotoIcon },
  { name: 'Blog', href: '/blog', icon: NewspaperIcon },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function DashboardLayout() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Nursery Admin"
              />
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-6 w-6 ${
                          isActive
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top header */}
          <div className="flex-shrink-0 flex h-16 bg-white shadow">
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex"></div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-4">{user?.name}</span>
                    <button
                      onClick={() => logout()}
                      className="bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}