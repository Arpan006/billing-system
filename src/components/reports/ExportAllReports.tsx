import  { useAppContext } from '../../context/AppContext';
import { Download } from 'lucide-react';
import { prepareAllReportsForExport } from '../../utils/export';
import { sampleDailySales, sampleTableSales } from '../../data/sample-data';

export default function ExportAllReports() {
  const { orders, purchases } = useAppContext();

  const handleExportAll = () => {
    prepareAllReportsForExport(
      orders,
      purchases,
      sampleDailySales,
      sampleTableSales
    );
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Complete Export</h2>
          <p className="text-sm text-gray-500">Export all reports and data in CSV format</p>
        </div>
        <button
          onClick={handleExportAll}
          className="btn btn-primary flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Export All Reports
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-md border">
        <h3 className="font-medium mb-2">The following reports will be exported:</h3>
        <ul className="space-y-1 list-disc list-inside text-gray-600">
          <li>Detailed Sales Report</li>
          <li>Daily Sales Summary</li>
          <li>Weekly Sales Report</li>
          <li>Monthly Sales Report</li>
          <li>Current Week Sales</li>
          <li>Last Week Sales</li>
          <li>Current Month Sales</li>
          <li>Last Month Sales</li>
          <li>Table-wise Sales</li>
          <li>Purchases Report</li>
        </ul>
      </div>
    </div>
  );
}
 