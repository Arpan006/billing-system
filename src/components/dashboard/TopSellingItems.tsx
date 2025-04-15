import  { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/format';

export default function TopSellingItems() {
  const { orders } = useAppContext();
  
  // Calculate item frequencies and revenue
  const itemStats = orders.reduce((acc: {[key: string]: {count: number, revenue: number}}, order) => {
    order.items.forEach(item => {
      const itemKey = item.name;
      if (!acc[itemKey]) {
        acc[itemKey] = { count: 0, revenue: 0 };
      }
      acc[itemKey].count += item.quantity;
      acc[itemKey].revenue += item.price * item.quantity;
    });
    return acc;
  }, {});
  
  // Convert to array, sort by count, and take top 5
  const topItems = Object.entries(itemStats)
    .map(([name, { count, revenue }]) => ({ name, count, revenue }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Top Selling Items</h2>
      <div className="space-y-4">
        {topItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.count} sold</p>
              </div>
            </div>
            <p className="font-medium">{formatCurrency(item.revenue)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 