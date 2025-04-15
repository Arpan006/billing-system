import  { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/format';

export default function PurchaseForm() {
  const { addPurchase } = useAppContext();
  
  const [purchaseData, setPurchaseData] = useState({
    itemName: '',
    quantity: 1,
    unitPrice: 0,
    vendor: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setPurchaseData({
      ...purchaseData,
      [name]: name === 'quantity' || name === 'unitPrice'
        ? parseFloat(value) || 0
        : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalCost = purchaseData.quantity * purchaseData.unitPrice;
    
    const newPurchase = {
      id: `pur-${Date.now().toString().slice(-6)}`,
      date: new Date(purchaseData.date),
      itemName: purchaseData.itemName,
      quantity: purchaseData.quantity,
      unitPrice: purchaseData.unitPrice,
      vendor: purchaseData.vendor,
      totalCost,
    };
    
    addPurchase(newPurchase);
    
    setSuccessMessage(`Purchase for ${purchaseData.itemName} added successfully.`);
    setTimeout(() => setSuccessMessage(''), 3000);
    
    // Reset form
    setPurchaseData({
      itemName: '',
      quantity: 1,
      unitPrice: 0,
      vendor: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const totalCost = purchaseData.quantity * purchaseData.unitPrice;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Add Purchase</h2>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={purchaseData.itemName}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">
              Vendor
            </label>
            <input
              type="text"
              id="vendor"
              name="vendor"
              value={purchaseData.vendor}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              step="0.1"
              value={purchaseData.quantity}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Unit Price (₹)
            </label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              min="0.01"
              step="0.01"
              value={purchaseData.unitPrice}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={purchaseData.date}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </div>
          
          <div className="flex items-end">
            <div className="bg-gray-50 p-3 rounded-md border w-full">
              <p className="text-sm text-gray-500 mb-1">Total Cost</p>
              <p className="text-lg font-semibold">{formatCurrency(totalCost)}</p>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!purchaseData.itemName || purchaseData.quantity <= 0 || purchaseData.unitPrice <= 0}
        >
          Add Purchase
        </button>
      </form>
    </div>
  );
}
 