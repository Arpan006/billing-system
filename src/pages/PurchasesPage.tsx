import  Layout from '../components/Layout';
import PurchaseForm from '../components/purchases/PurchaseForm';
import PurchasesList from '../components/purchases/PurchasesList';
import ParticlesBackground from '../components/ParticlesBackground';

export default function PurchasesPage() {
  return (
    <Layout>
      <ParticlesBackground />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
        <p className="text-gray-500">Manage your inventory purchases</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <PurchaseForm />
        </div>
        
        <div className="lg:col-span-2">
          <PurchasesList />
        </div>
      </div>
    </Layout>
  );
}
 