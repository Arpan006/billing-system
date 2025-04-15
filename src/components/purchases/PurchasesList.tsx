import  { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency, formatDateString } from '../../utils/format';
import { exportToCSV, preparePurchasesForExport } from '../../utils/export';

export default function PurchasesList() {
  const { purchases } = useAppContext();
  const [search, setSearch] = useState('');
  
  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.itemName.toLowerCase().includes(search.toLowerCase()) ||
      purchase.vendor.toLowerCase().includes(search.toLowerCase())
  );
  
  // Sort by most recent date
  const sortedPurchases = [...filteredPurchases].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Calculate total expenses
  const totalExpenses = sortedPurchases.reduce(
    (total, purchase) => total + purchase.totalCost,
    0
  );
  
  const handleExportCSV = () => {
    const exportData = preparePurchasesForExport(purchases);
    exportToCSV(exportData, 'haven-cafe-purchases');
  };

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">Purchase History</h2>
        <div className="flex w-full md:w-auto space-x-2">
          <div className="relative flex-grow md:w-64">
            <input
              type="text"
              placeholder="Search purchases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full pl-9"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={handleExportCSV}
            className="btn btn-secondary flex items-center whitespace-nowrap"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md border mb-4">
        <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
        <p className="text-lg font-semibold">{formatCurrency(totalExpenses)}</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPurchases.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  {search ? 'No purchases found matching your search.' : 'No purchases recorded yet.'}
                </td>
              </tr>
            ) : (
              sortedPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{purchase.itemName}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {purchase.vendor}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDateString(purchase.date.toString())}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {purchase.quantity}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(purchase.unitPrice)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {formatCurrency(purchase.totalCost)}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 