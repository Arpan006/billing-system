import  { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Download } from 'lucide-react';
import { sampleDailySales, samplePurchases } from '../../data/sample-data';
import { formatCurrency } from '../../utils/format';
import { exportToCSV } from '../../utils/export';

export default function ProfitLossReport() {
  // Create profit/loss data from sales and purchases
  const profitLossData = sampleDailySales.map(day => {
    // Find purchases for this day
    const purchasesForDay = samplePurchases.filter(
      purchase => purchase.date.toString().split('T')[0] === day.date
    );
    
    // Calculate total purchases for the day
    const totalPurchases = purchasesForDay.reduce(
      (total, purchase) => total + purchase.totalCost,
      0
    );
    
    // Estimate a profit based on sales and purchases
    // In a real app, this would be more complex with COGS calculations
    const profit = day.totalSales - totalPurchases;
    
    return {
      date: day.date,
      sales: day.totalSales,
      purchases: totalPurchases,
      profit,
    };
  });
  
  // Calculate totals
  const totalSales = profitLossData.reduce((total, day) => total + day.sales, 0);
  const totalPurchases = profitLossData.reduce((total, day) => total + day.purchases, 0);
  const totalProfit = profitLossData.reduce((total, day) => total + day.profit, 0);
  const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;
  
  const handleExportCSV = () => {
    const exportData = profitLossData.map(item => ({
      Date: item.date,
      Sales: item.sales,
      Expenses: item.purchases,
      Profit: item.profit
    }));
    
    exportToCSV(exportData, 'haven-cafe-profit-loss');
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Profit & Loss Overview</h2>
        <button
          onClick={handleExportCSV}
          className="btn btn-secondary flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-md bg-green-50 border border-green-100">
          <p className="text-sm text-green-600 mb-1">Total Profit</p>
          <p className="text-xl font-semibold text-green-800">{formatCurrency(totalProfit)}</p>
        </div>
        
        <div className="p-4 rounded-md bg-blue-50 border border-blue-100">
          <p className="text-sm text-blue-600 mb-1">Profit Margin</p>
          <p className="text-xl font-semibold text-blue-800">{profitMargin.toFixed(1)}%</p>
        </div>
        
        <div className="p-4 rounded-md bg-amber-50 border border-amber-100">
          <p className="text-sm text-amber-600 mb-1">Total Expenses</p>
          <p className="text-xl font-semibold text-amber-800">{formatCurrency(totalPurchases)}</p>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={profitLossData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="sales" name="Sales" fill="#0ea5e9" />
            <Bar dataKey="purchases" name="Expenses" fill="#f59e0b" />
            <Bar dataKey="profit" name="Profit" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Financial Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="flex justify-between py-1 border-b">
              <span className="text-gray-600">Total Sales:</span>
              <span className="font-medium">{formatCurrency(totalSales)}</span>
            </p>
            <p className="flex justify-between py-1 border-b">
              <span className="text-gray-600">Total Expenses:</span>
              <span className="font-medium">{formatCurrency(totalPurchases)}</span>
            </p>
            <p className="flex justify-between py-1 font-semibold">
              <span>Net Profit:</span>
              <span>{formatCurrency(totalProfit)}</span>
            </p>
          </div>
          <div>
            <p className="flex justify-between py-1 border-b">
              <span className="text-gray-600">Profit Margin:</span>
              <span className="font-medium">{profitMargin.toFixed(1)}%</span>
            </p>
            <p className="flex justify-between py-1 border-b">
              <span className="text-gray-600">Sales to Expense Ratio:</span>
              <span className="font-medium">{totalPurchases > 0 ? (totalSales / totalPurchases).toFixed(2) : '0.00'}</span>
            </p>
            <p className="flex justify-between py-1">
              <span className="text-gray-600">Avg. Daily Profit:</span>
              <span className="font-medium">
                {formatCurrency(profitLossData.length > 0 ? totalProfit / profitLossData.length : 0)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
 