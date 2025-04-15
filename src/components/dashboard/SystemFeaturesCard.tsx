import  { Check, Coffee } from 'lucide-react';

export default function SystemFeaturesCard() {
  const features = [
    { name: "Sale Tracking", description: "Daily, weekly, and monthly sales tracking with UPI and cash payment options" },
    { name: "Inventory Management", description: "Track purchases and manage your inventory with detailed reports" },
    { name: "Table Management", description: "Manage orders by table for better service organization" },
    { name: "Receipt Printing", description: "Generate and print professional receipts for customers" },
    { name: "Business Analytics", description: "Get insights about your cafe's performance with visual reports" },
    { name: "Export Reports", description: "Export all reports to CSV format for accounting and analysis" },
    { name: "Menu Management", description: "Easily manage your complete menu with categories and item sizing" },
    { name: "Profit Calculation", description: "Calculate your profit and loss automatically based on sales and purchases" }
  ];

  return (
    <div className="card mt-6">
      <div className="flex items-center mb-4">
        <Coffee className="h-6 w-6 text-primary-600 mr-2" />
        <h2 className="text-xl font-semibold">Haven Cafe Billing System</h2>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">
          Welcome to the Haven Cafe Billing System! This comprehensive system helps you manage your cafe operations efficiently. 
          Here's a guide to the key features available:
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-lg border-b pb-2">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-gray-900">{feature.name}</h4>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <h3 className="font-medium text-lg mb-2">How to Use</h3>
        <ol className="list-decimal list-inside text-gray-600 space-y-2 pl-2">
          <li>Use the <strong>Dashboard</strong> to view business performance at a glance</li>
          <li>Create new orders on the <strong>Billing</strong> page by selecting a table, adding menu items, and choosing payment mode</li>
          <li>Record ingredient purchases on the <strong>Purchases</strong> page for inventory tracking</li>
          <li>View comprehensive analytics on the <strong>Reports</strong> page and export data as needed</li>
          <li>Print customer receipts directly from the billing interface</li>
        </ol>
      </div>
    </div>
  );
}
 