import  SalesReport from './SalesReport';
import WeeklySalesReport from './WeeklySalesReport';
import MonthlySalesReport from './MonthlySalesReport';
import TablesSalesReport from './TablesSalesReport';
import ProfitLossReport from './ProfitLossReport';
import ExportAllReports from './ExportAllReports';
import { useState } from 'react';

export default function AllReports() {
  const [activeReport, setActiveReport] = useState<'daily' | 'weekly' | 'monthly' | 'tables' | 'profit' | 'all'>('daily');

  return (
    <div>
      <ExportAllReports />
      
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Report Navigator</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveReport('daily')}
            className={`px-4 py-2 rounded-md ${
              activeReport === 'daily'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Daily Sales
          </button>
          <button
            onClick={() => setActiveReport('weekly')}
            className={`px-4 py-2 rounded-md ${
              activeReport === 'weekly'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Weekly Sales
          </button>
          <button
            onClick={() => setActiveReport('monthly')}
            className={`px-4 py-2 rounded-md ${
              activeReport === 'monthly'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Monthly Sales
          </button>
          <button
            onClick={() => setActiveReport('tables')}
            className={`px-4 py-2 rounded-md ${
              activeReport === 'tables'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Table Sales
          </button>
          <button
            onClick={() => setActiveReport('profit')}
            className={`px-4 py-2 rounded-md ${
              activeReport === 'profit'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Profit & Loss
          </button>
          <button
            onClick={() => setActiveReport('all')}
            className={`px-4 py-2 rounded-md ${
              activeReport === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All Reports
          </button>
        </div>
      </div>
      
      {(activeReport === 'daily' || activeReport === 'all') && <SalesReport />}
      {(activeReport === 'weekly' || activeReport === 'all') && <WeeklySalesReport />}
      {(activeReport === 'monthly' || activeReport === 'all') && <MonthlySalesReport />}
      
      {(activeReport === 'tables' || activeReport === 'all') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TablesSalesReport />
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Haven Cafe</h2>
            <div className="rounded-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1482350325005-eda5e677279b?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjYWZlfGVufDB8fHx8MTc0NDcxMTY0MHww&ixlib=rb-4.0.3&fit=fillmax&h=400&w=600" 
                alt="Cafe Interior" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-medium text-lg">Lakkar Bazar, Solan</h3>
              <p className="text-gray-600 mt-2">
                Our cafe provides an inviting atmosphere for customers to enjoy their meals and beverages.
                The business analytics help us understand customer preferences and optimize our offerings.
              </p>
              <p className="text-sm text-gray-500 mt-2">Contact: +91 97364 89355</p>
            </div>
          </div>
        </div>
      )}
      
      {(activeReport === 'profit' || activeReport === 'all') && <ProfitLossReport />}
    </div>
  );
}
 