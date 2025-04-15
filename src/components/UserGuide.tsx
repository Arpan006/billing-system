import  { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

export default function UserGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white rounded-full p-3 shadow-lg hover:bg-primary-700 z-20"
        aria-label="Help"
      >
        <HelpCircle className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary-800">Haven Cafe Billing System Guide</h2>
              <p className="text-gray-600 mt-2">
                Welcome to the Haven Cafe Billing System! This guide will help you get started with the system and learn how to use all its features.
              </p>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard</h3>
                <p className="text-gray-600 mb-2">
                  The dashboard provides an overview of your cafe's performance with key metrics:
                </p>
                <ul className="list-disc list-inside text-gray-600 ml-2">
                  <li>Today's sales, orders, and payment method breakdown</li>
                  <li>Sales overview chart showing trends</li>
                  <li>Recent orders list</li>
                  <li>Top-selling items</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Billing</h3>
                <p className="text-gray-600 mb-2">
                  The billing page is where you create and process orders:
                </p>
                <ol className="list-decimal list-inside text-gray-600 ml-2">
                  <li>Start by selecting a table number</li>
                  <li>Browse the menu categories or search for items</li>
                  <li>Click on an item to select it</li>
                  <li>Choose the size (if applicable) and quantity</li>
                  <li>Click "Add to Order" to add the item to the current order</li>
                  <li>Enter optional customer information</li>
                  <li>Select the payment mode (Cash or UPI)</li>
                  <li>Click "Place Order" to complete the transaction</li>
                  <li>Use the "Receipt" button to print or save a receipt</li>
                </ol>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Purchases</h3>
                <p className="text-gray-600 mb-2">
                  The purchases page helps you track your inventory costs:
                </p>
                <ul className="list-disc list-inside text-gray-600 ml-2">
                  <li>Enter item name, vendor, quantity, and unit price</li>
                  <li>The system calculates the total cost automatically</li>
                  <li>View all purchase history in the purchases list</li>
                  <li>Search for specific purchases by item or vendor</li>
                  <li>Export purchase data to CSV for accounting purposes</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Reports</h3>
                <p className="text-gray-600 mb-2">
                  The reports page offers comprehensive analytics:
                </p>
                <ul className="list-disc list-inside text-gray-600 ml-2">
                  <li>Daily sales reports with cash and UPI breakdowns</li>
                  <li>Weekly sales analysis</li>
                  <li>Monthly performance metrics</li>
                  <li>Table-wise sales distribution</li>
                  <li>Profit and loss overview</li>
                  <li>Export functionality for all reports in CSV format</li>
                  <li>"Export All Reports" button for downloading comprehensive data</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Storage</h3>
                <p className="text-gray-600">
                  All data is stored locally in your browser using localStorage. This means:
                </p>
                <ul className="list-disc list-inside text-gray-600 ml-2">
                  <li>Data persists between browser sessions</li>
                  <li>No internet connection required to use the system</li>
                  <li>For data backup, regularly export reports to CSV</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Special Features</h3>
                <p className="text-gray-600 mb-2">
                  The system includes several special features:
                </p>
                <ul className="list-disc list-inside text-gray-600 ml-2">
                  <li>Interactive particle background for a modern look</li>
                  <li>Comprehensive export system for all types of reports</li>
                  <li>Print-ready customer receipts</li>
                  <li>Mobile-responsive design for use on tablets and phones</li>
                  <li>Real-time calculations and visualizations</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
 