import  { ArrowUp, ArrowDown, CreditCard, ShoppingBag } from 'lucide-react';
import { sampleDailySales } from '../../data/sample-data';
import { formatCurrency } from '../../utils/format';

export default function SalesCards() {
  // Get today's and yesterday's sales
  const todaySales = sampleDailySales[sampleDailySales.length - 1];
  const yesterdaySales = sampleDailySales[sampleDailySales.length - 2];
  
  // Calculate change percentage
  const salesChange = ((todaySales.totalSales - yesterdaySales.totalSales) / yesterdaySales.totalSales) * 100;
  const ordersChange = ((todaySales.ordersCount - yesterdaySales.ordersCount) / yesterdaySales.ordersCount) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="card flex justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Today's Sales</p>
          <h3 className="text-2xl font-bold">{formatCurrency(todaySales.totalSales)}</h3>
          <div className={`flex items-center mt-2 text-sm ${salesChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {salesChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            <span>{Math.abs(salesChange).toFixed(1)}% vs yesterday</span>
          </div>
        </div>
        <div className="bg-primary-100 h-12 w-12 rounded-full flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-primary-700" />
        </div>
      </div>
      
      <div className="card flex justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Orders</p>
          <h3 className="text-2xl font-bold">{todaySales.ordersCount}</h3>
          <div className={`flex items-center mt-2 text-sm ${ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {ordersChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            <span>{Math.abs(ordersChange).toFixed(1)}% vs yesterday</span>
          </div>
        </div>
        <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center">
          <ShoppingBag className="h-5 w-5 text-green-700" />
        </div>
      </div>
      
      <div className="card flex justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Cash Sales</p>
          <h3 className="text-2xl font-bold">{formatCurrency(todaySales.cashSales)}</h3>
          <p className="text-xs text-gray-500 mt-2">{((todaySales.cashSales / todaySales.totalSales) * 100).toFixed(1)}% of total</p>
        </div>
        <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-blue-700" />
        </div>
      </div>
      
      <div className="card flex justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">UPI Sales</p>
          <h3 className="text-2xl font-bold">{formatCurrency(todaySales.upiSales)}</h3>
          <p className="text-xs text-gray-500 mt-2">{((todaySales.upiSales / todaySales.totalSales) * 100).toFixed(1)}% of total</p>
        </div>
        <div className="bg-indigo-100 h-12 w-12 rounded-full flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-indigo-700" />
        </div>
      </div>
    </div>
  );
}
 