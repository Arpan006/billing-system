import  { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { sampleTableSales } from '../../data/sample-data';
import { formatCurrency } from '../../utils/format';
import { Download } from 'lucide-react';
import { exportToCSV, prepareTableSalesForExport } from '../../utils/export';

export default function TablesSalesReport() {
  const COLORS = ['#0ea5e9', '#14b8a6', '#f59e0b', '#a855f7', '#6366f1', '#10b981', '#ec4899'];
  
  // Format data for the chart
  const tableData = sampleTableSales.map((table, index) => ({
    name: `Table ${table.tableNumber}`,
    value: table.totalSales,
    color: COLORS[index % COLORS.length],
  }));
  
  // Calculate total sales
  const totalTableSales = tableData.reduce((total, table) => total + table.value, 0);
  
  // Sort tables by sales for the list display
  const sortedTableSales = [...sampleTableSales].sort((a, b) => b.totalSales - a.totalSales);
  
  const handleExportCSV = () => {
    const exportData = prepareTableSalesForExport(sampleTableSales);
    exportToCSV(exportData, 'haven-cafe-table-sales');
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Table Sales Distribution</h2>
        <button
          onClick={handleExportCSV}
          className="btn btn-secondary flex items-center text-sm py-1"
        >
          <Download className="h-3 w-3 mr-1" />
          Export
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tableData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {tableData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [formatCurrency(value), 'Sales']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">Total Sales by Table</h3>
            <p className="text-sm text-gray-500">For current date: {sampleTableSales[0].date}</p>
          </div>
          
          <div className="space-y-3">
            {sortedTableSales.map((table) => (
              <div key={table.tableNumber} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3">
                    {table.tableNumber}
                  </div>
                  <div>
                    <p className="font-medium">Table {table.tableNumber}</p>
                    <p className="text-xs text-gray-500">{table.ordersCount} orders</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">{formatCurrency(table.totalSales)}</p>
                  <p className="text-xs text-gray-500 text-right">
                    {totalTableSales === 0 ? '0.0%' : ((table.totalSales / totalTableSales) * 100).toFixed(1) + '%'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 