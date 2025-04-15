import  { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, ArrowDown, Download } from 'lucide-react';
import { sampleDailySales } from '../../data/sample-data';
import { formatCurrency } from '../../utils/format';
import { exportToCSV, prepareDailySalesForExport } from '../../utils/export';

const reportTypes = ['Daily', 'Weekly', 'Monthly'];

export default function SalesReport() {
  const [activeReportType, setActiveReportType] = useState('Daily');
  const [chartData, setChartData] = useState(sampleDailySales);
  
  // Calculate some metrics
  const totalSales = chartData.reduce((total, day) => total + day.totalSales, 0);
  const avgSales = totalSales / chartData.length || 0;
  const maxSales = Math.max(...chartData.map(day => day.totalSales), 0);
  const minSales = Math.min(...chartData.map(day => day.totalSales).filter(sale => sale > 0), 0);
  
  useEffect(() => {
    // In a real app, this would fetch different data based on the report type
    // Here we just modify the existing data slightly for demonstration
    if (activeReportType === 'Weekly') {
      setChartData(sampleDailySales.slice(0, 5).map(day => ({
        ...day,
        date: `Week ${day.date.split('-')[2]}`,
        totalSales: day.totalSales * 1.5
      })));
    } else if (activeReportType === 'Monthly') {
      setChartData([
        { date: 'Jan', cashSales: 0, upiSales: 0, totalSales: 0, ordersCount: 0 },
        { date: 'Feb', cashSales: 0, upiSales: 0, totalSales: 0, ordersCount: 0 },
        { date: 'Mar', cashSales: 0, upiSales: 0, totalSales: 0, ordersCount: 0 },
        { date: 'Apr', cashSales: 0, upiSales: 0, totalSales: 0, ordersCount: 0 },
        { date: 'May', cashSales: 0, upiSales: 0, totalSales: 0, ordersCount: 0 },
        { date: 'Jun', cashSales: 0, upiSales: 0, totalSales: 0, ordersCount: 0 },
      ]);
    } else {
      setChartData(sampleDailySales);
    }
  }, [activeReportType]);

  const handleExportCSV = () => {
    const exportData = prepareDailySalesForExport(chartData);
    exportToCSV(exportData, `haven-cafe-${activeReportType.toLowerCase()}-sales`);
  };

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">Sales Report</h2>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <button className="input flex items-center justify-between w-full md:w-40">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>This Month</span>
              </div>
              <ArrowDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          
          <div className="flex space-x-1">
            {reportTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveReportType(type)}
                className={`px-3 py-2 text-sm rounded-md ${
                  activeReportType === type
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-md bg-primary-50 border border-primary-100">
          <p className="text-sm text-primary-600 mb-1">Total Sales</p>
          <p className="text-xl font-semibold text-primary-800">{formatCurrency(totalSales)}</p>
        </div>
        
        <div className="p-4 rounded-md bg-green-50 border border-green-100">
          <p className="text-sm text-green-600 mb-1">Average Daily Sales</p>
          <p className="text-xl font-semibold text-green-800">{formatCurrency(avgSales)}</p>
        </div>
        
        <div className="p-4 rounded-md bg-indigo-50 border border-indigo-100">
          <p className="text-sm text-indigo-600 mb-1">Highest Sales</p>
          <p className="text-xl font-semibold text-indigo-800">{formatCurrency(maxSales)}</p>
        </div>
        
        <div className="p-4 rounded-md bg-amber-50 border border-amber-100">
          <p className="text-sm text-amber-600 mb-1">Lowest Sales</p>
          <p className="text-xl font-semibold text-amber-800">{formatCurrency(minSales)}</p>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
            <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Sales']} />
            <Area
              type="monotone"
              dataKey="cashSales"
              name="Cash"
              stackId="1"
              stroke="#0284c7"
              fill="#0ea5e9"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="upiSales"
              name="UPI"
              stackId="1"
              stroke="#059669"
              fill="#10b981"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleExportCSV}
          className="btn btn-secondary flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </button>
      </div>
    </div>
  );
}
 