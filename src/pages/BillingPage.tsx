import  { useState } from 'react';
import Layout from '../components/Layout';
import TableSelection from '../components/billing/TableSelection';
import MenuList from '../components/billing/MenuList';
import OrderSummary from '../components/billing/OrderSummary';
import { OrderItem } from '../types';
import ParticlesBackground from '../components/ParticlesBackground';

export default function BillingPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  
  const handleAddItem = (item: OrderItem) => {
    // Check if item with same id and size already exists
    const existingItemIndex = orderItems.findIndex(
      (i) => i.id === item.id && i.size === item.size
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setOrderItems(updatedItems);
    } else {
      // Add new item
      setOrderItems([...orderItems, item]);
    }
  };
  
  const handleRemoveItem = (index: number) => {
    const updatedItems = [...orderItems];
    updatedItems.splice(index, 1);
    setOrderItems(updatedItems);
  };
  
  const handleClearOrder = () => {
    setOrderItems([]);
  };

  return (
    <Layout>
      <ParticlesBackground />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500">Create and manage orders</p>
      </div>
      
      <TableSelection />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md h-[calc(100vh-240px)]">
            <MenuList onAddItem={handleAddItem} />
          </div>
        </div>
        
        <div>
          <div className="h-[calc(100vh-240px)]">
            <OrderSummary 
              orderItems={orderItems} 
              onRemoveItem={handleRemoveItem}
              onClearOrder={handleClearOrder}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
 