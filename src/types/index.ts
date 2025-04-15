export  interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  sizes?: { [key: string]: number };
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  timestamp: Date;
  paymentMode: 'Cash' | 'UPI';
  totalAmount: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
}

export interface Purchase {
  id: string;
  date: Date;
  itemName: string;
  quantity: number;
  unitPrice: number;
  vendor: string;
  totalCost: number;
}

export interface DailySales {
  date: string;
  cashSales: number;
  upiSales: number;
  totalSales: number;
  ordersCount: number;
}

export interface TableSales {
  tableNumber: number;
  date: string;
  totalSales: number;
  ordersCount: number;
}
 