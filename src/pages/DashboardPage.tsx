import  Layout from '../components/Layout';
import SalesCards from '../components/dashboard/SalesCards';
import SalesOverview from '../components/dashboard/SalesOverview';
import RecentOrders from '../components/dashboard/RecentOrders';
import TopSellingItems from '../components/dashboard/TopSellingItems';
import SystemFeaturesCard from '../components/dashboard/SystemFeaturesCard';
import ParticlesBackground from '../components/ParticlesBackground';

export default function DashboardPage() {
  return (
    <Layout>
      <ParticlesBackground />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome to Haven Cafe Management System</p>
        </div>
        <div className="hidden md:block">
          <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjYWZlfGVufDB8fHx8MTc0NDcxMTY0MHww&ixlib=rb-4.0.3&fit=fillmax&h=400&w=600" alt="Haven Cafe" className="w-16 h-16 rounded-full object-cover" />
        </div>
      </div>
      
      <SalesCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SalesOverview />
        <RecentOrders />
      </div>
      
      <SystemFeaturesCard />
      
      <div className="mt-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjYWZlfGVufDB8fHx8MTc0NDcxMTY0MHww&ixlib=rb-4.0.3&fit=fillmax&h=400&w=600" alt="Haven Cafe" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Haven Cafe</h2>
            <p className="text-gray-500">Lakkar Bazar, Solan, Himachal Pradesh</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <TopSellingItems />
          </div>
          <div>
            <div className="card h-full">
              <h2 className="text-xl font-semibold mb-4">Cafe Atmosphere</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjYWZlfGVufDB8fHx8MTc0NDcxMTY0MHww&ixlib=rb-4.0.3&fit=fillmax&h=400&w=600" alt="Cafe Interior" className="w-full h-40 object-cover rounded-md" />
                <img src="https://images.unsplash.com/photo-1493857671505-72967e2e2760?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjYWZlfGVufDB8fHx8MTc0NDcxMTY0MHww&ixlib=rb-4.0.3&fit=fillmax&h=400&w=600" alt="Coffee Shop" className="w-full h-40 object-cover rounded-md" />
              </div>
              <div className="mt-4">
                <p className="text-gray-600">
                  Haven Cafe offers a warm, inviting atmosphere for customers to enjoy quality food and beverages. Our cafe focuses on providing exceptional service and maintains consistent quality standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
 