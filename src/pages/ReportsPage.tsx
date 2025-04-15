import  Layout from '../components/Layout';
import AllReports from '../components/reports/AllReports';
import ParticlesBackground from '../components/ParticlesBackground';

export default function ReportsPage() {
  return (
    <Layout>
      <ParticlesBackground />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500">View and export business performance reports and analytics</p>
      </div>
      
      <AllReports />
    </Layout>
  );
}
 