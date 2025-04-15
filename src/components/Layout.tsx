import  { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Home, ShoppingBag, ShoppingCart, BarChart, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Billing', href: '/billing', icon: ShoppingCart },
    { name: 'Purchases', href: '/purchases', icon: ShoppingBag },
    { name: 'Reports', href: '/reports', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
              <div className="flex items-center flex-shrink-0 px-4 mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjYWZlfGVufDB8fHx8MTc0NDcxMTY0MHww&ixlib=rb-4.0.3&fit=fillmax&h=400&w=600" 
                  alt="Haven Cafe" 
                  className="h-10 w-10 rounded-full object-cover mr-2"
                />
                <span className="ml-2 text-xl font-semibold text-primary-800">Haven Cafe</span>
              </div>
              <div className="flex flex-col flex-grow">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-secondary-600 hover:bg-gray-100'
                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                      >
                        <item.icon
                          className={`${
                            isActive ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-500'
                          } mr-3 flex-shrink-0 h-5 w-5`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjYWZlfGVufDB8fHx8MTc0NDcxMTY0MHww&ixlib=rb-4.0.3&fit=fillmax&h=400&w=600" 
                alt="Haven Cafe" 
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="ml-2 text-lg font-medium text-gray-900">Haven Cafe</span>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img 
                    src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjYWZlfGVufDB8fHx8MTc0NDcxMTY0MHww&ixlib=rb-4.0.3&fit=fillmax&h=400&w=600" 
                    alt="Haven Cafe" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="ml-2 text-xl font-semibold text-primary-800">Haven Cafe</span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-secondary-600 hover:bg-gray-100'
                        } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon
                          className={`${
                            isActive ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-500'
                          } mr-3 flex-shrink-0 h-6 w-6`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <main className="relative flex-1 overflow-y-auto focus:outline-none pt-16 md:pt-0">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
 