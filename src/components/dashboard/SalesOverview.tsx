import  { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { sampleDailySales } from '../../data/sample-data';
import { formatCurrency } from '../../utils/format';

export default function SalesOverview() {
  const last7Days = sampleDailySales.slice(-7);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={last7Days}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Sales']}
            />
            <Bar dataKey="cashSales" name="Cash" fill="#0ea5e9" />
            <Bar dataKey="upiSales" name="UPI" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
 