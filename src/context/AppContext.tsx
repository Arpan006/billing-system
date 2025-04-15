import  { createContext, useContext, useState, ReactNode } from 'react';
import { Order, Purchase } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sampleOrders, samplePurchases } from '../data/sample-data';

interface AppContextType {
  orders: Order[];
  purchases: Purchase[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addPurchase: (purchase: Purchase) => void;
  activeTableNumber: number | null;
  setActiveTableNumber: (tableNumber: number | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', sampleOrders);
  const [purchases, setPurchases] = useLocalStorage<Purchase[]>('purchases', samplePurchases);
  const [activeTableNumber, setActiveTableNumber] = useState<number | null>(null);

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const addPurchase = (purchase: Purchase) => {
    setPurchases((prevPurchases) => [...prevPurchases, purchase]);
  };

  return (
    <AppContext.Provider
      value={{
        orders,
        purchases,
        addOrder,
        updateOrderStatus,
        addPurchase,
        activeTableNumber,
        setActiveTableNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
 