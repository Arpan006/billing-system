import  { useState } from 'react';
import { Trash2, Printer, Check, FileText, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { OrderItem } from '../../types';
import { formatCurrency } from '../../utils/format';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  onRemoveItem: (index: number) => void;
  onClearOrder: () => void;
}

export default function OrderSummary({ orderItems, onRemoveItem, onClearOrder }: OrderSummaryProps) {
  const { activeTableNumber, addOrder } = useAppContext();
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'UPI'>('Cash');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  const totalAmount = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (orderItems.length === 0 || !activeTableNumber) return;
    
    const newOrder = {
      id: `ord-${Date.now().toString().slice(-6)}`,
      tableNumber: activeTableNumber,
      items: [...orderItems],
      timestamp: new Date(),
      paymentMode,
      totalAmount,
      status: 'Completed' as const,
    };
    
    addOrder(newOrder);
    setOrderPlaced(true);
    
    setTimeout(() => {
      setOrderPlaced(false);
      onClearOrder();
    }, 2000);
  };

  const handlePrintReceipt = () => {
    setIsPrintPreviewOpen(true);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('receipt-to-print');
    const originalContents = document.body.innerHTML;
    
    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      setIsPrintPreviewOpen(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-secondary-800 text-white py-3 px-4 rounded-t-md">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {activeTableNumber && (
          <p className="text-sm">Table {activeTableNumber}</p>
        )}
      </div>
      
      <div className="flex-grow overflow-y-auto bg-white border-l border-r">
        {orderItems.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No items in the order</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {orderItems.map((item, index) => (
              <li key={index} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.size && `${item.size} · `}
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium mr-3">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="bg-white border-l border-r border-b p-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-b-md border border-t-0">
        {/* Customer Information */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Information (Optional)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="input"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
          <div className="flex space-x-2">
            <button
              onClick={() => setPaymentMode('Cash')}
              className={`flex-1 py-2 rounded-md border ${
                paymentMode === 'Cash'
                  ? 'bg-primary-600 text-white border-primary-700'
                  : 'bg-white border-gray-300'
              }`}
            >
              Cash
            </button>
            <button
              onClick={() => setPaymentMode('UPI')}
              className={`flex-1 py-2 rounded-md border ${
                paymentMode === 'UPI'
                  ? 'bg-primary-600 text-white border-primary-700'
                  : 'bg-white border-gray-300'
              }`}
            >
              UPI
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onClearOrder}
            className="btn btn-secondary flex-1"
            disabled={orderItems.length === 0}
          >
            Clear
          </button>
          <button
            onClick={handlePrintReceipt}
            className="btn btn-secondary flex items-center justify-center"
            disabled={orderItems.length === 0}
          >
            <FileText className="h-4 w-4 mr-1" />
            Receipt
          </button>
          <button
            onClick={handlePlaceOrder}
            className={`btn flex-1 flex items-center justify-center ${
              orderPlaced ? 'btn-success' : 'btn-primary'
            }`}
            disabled={orderItems.length === 0 || !activeTableNumber || orderPlaced}
          >
            {orderPlaced ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Placed!
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>

      {/* Receipt Print Modal */}
      {isPrintPreviewOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Receipt Preview</h2>
              <button 
                onClick={() => setIsPrintPreviewOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div id="receipt-to-print" className="border p-4 mb-4 text-sm">
              <div className="text-center mb-4">
                <h1 className="text-xl font-bold">Haven Cafe</h1>
                <p>Lakkar Bazar, Solan, Himachal Pradesh</p>
                <p>Phone: +91 97364 89355</p>
                <div className="border-b border-gray-300 my-2"></div>
                <p className="font-medium">TAX INVOICE</p>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between">
                  <span>Invoice #:</span>
                  <span>{`INV-${Date.now().toString().slice(-6)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date().toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{new Date().toLocaleTimeString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Table #:</span>
                  <span>{activeTableNumber}</span>
                </div>
                {customerName && (
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span>{customerName}</span>
                  </div>
                )}
                {customerPhone && (
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>{customerPhone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span>{paymentMode}</span>
                </div>
              </div>
              
              <div className="border-b border-gray-300 my-2"></div>
              
              <table className="w-full mb-4">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-1">Item</th>
                    <th className="text-right pb-1">Qty</th>
                    <th className="text-right pb-1">Price</th>
                    <th className="text-right pb-1">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="py-1">
                        {item.name}
                        {item.size && <span className="text-xs"> ({item.size})</span>}
                      </td>
                      <td className="text-right py-1">{item.quantity}</td>
                      <td className="text-right py-1">{formatCurrency(item.price)}</td>
                      <td className="text-right py-1">{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="border-t border-gray-300 pt-2 mb-4">
                <div className="flex justify-between font-medium">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
              
              <div className="text-center text-sm">
                <p>Thank you for visiting Haven Cafe!</p>
                <p>We hope to see you again soon.</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={handlePrint}
                className="btn btn-primary flex items-center"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 