import  { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/format';
import { prepareWeeklySalesForExport, prepareCurrentWeekSalesForExport, prepareLastWeekSalesForExport, exportToCSV } from '../../utils/export';
import { useState } from 'react';

export default function WeeklySalesReport() {
  const { orders } = useAppContext();
  const [reportType, setReportType] = useState<'all' | 'current' | 'last'>('current');
  
  // Prepare weekly data for chart
  const weeklyData = prepareWeeklySalesForExport(orders);
  const currentWeekData = prepareCurrentWeekSalesForExport(orders);
  const lastWeekData = prepareLastWeekSalesForExport(orders);
  
  // Use appropriate data based on selected report type
  const chartData = reportType === 'all' 
    ? weeklyData
    : reportType === 'current' 
      ? currentWeekData 
      : lastWeekData;
  
  const handleExport = () => {
    if (reportType === 'all') {
      exportToCSV(weeklyData, 'haven-cafe-weekly-sales');
    } else if (reportType === 'current') {
      exportToCSV(currentWeekData, 'haven-cafe-current-week-sales');
    } else {
      exportToCSV(lastWeekData, 'haven-cafe-last-week-sales');
    }
  };

  return (
    <div className="card mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">Weekly Sales Report</h2>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <div className="flex space-x-1">
            <button
              onClick={() => setReportType('current')}
              className={`px-3 py-2 text-sm rounded-md ${
                reportType === 'current'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Current Week
            </button>
            <button
              onClick={() => setReportType('last')}
              className={`px-3 py-2 text-sm rounded-md ${
                reportType === 'last'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Last Week
            </button>
            <button
              onClick={() => setReportType('all')}
              className={`px-3 py-2 text-sm rounded-md ${
                reportType === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Weeks
            </button>
          </div>
          
          <button
            onClick={handleExport}
            className="btn btn-secondary flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {chartData.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-md border text-center">
          <p className="text-gray-500">No weekly sales data available for the selected period.</p>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Week" />
              <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="Cash Sales" name="Cash" fill="#0ea5e9" />
              <Bar dataKey="UPI Sales" name="UPI" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
 