import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/products/ProductsPage';
import ProductFormPage from './pages/products/ProductFormPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import MediaLibraryPage from './pages/media/MediaLibraryPage';
import BlogPage from './pages/blog/BlogPage';
import BlogFormPage from './pages/blog/BlogFormPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import CustomersPage from './pages/customers/CustomersPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import SettingsPage from './pages/settings/SettingsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/new" element={<ProductFormPage />} />
            <Route path="/products/:id" element={<ProductFormPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/media" element={<MediaLibraryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/new" element={<BlogFormPage />} />
            <Route path="/blog/:id" element={<BlogFormPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;