import  { DailySales, TableSales, Purchase, Order } from '../types';
import { formatCurrency } from './format';
import { format, subMonths, subWeeks, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export const exportToCSV = (data: any[], filename: string) => {
  // Convert data to CSV format
  let csv = '';
  
  // Create header row
  const headers = Object.keys(data[0]);
  csv += headers.join(',') + '\n';
  
  // Add data rows
  data.forEach(item => {
    const values = headers.map(header => {
      const value = item[header];
      // Format numbers as currency if needed
      if (typeof value === 'number') {
        // Don't format ordersCount as currency
        if (header === 'ordersCount' || header === 'Quantity') {
          return value;
        }
        // Remove the '₹' symbol from the formatted currency
        return formatCurrency(value).replace('₹', '').trim();
      }
      // Wrap text values in quotes
      if (typeof value === 'string') {
        return `"${value}"`;
      }
      return value;
    });
    csv += values.join(',') + '\n';
  });
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const prepareDailySalesForExport = (data: DailySales[]) => {
  return data.map(day => ({
    Date: day.date,
    'Cash Sales': day.cashSales,
    'UPI Sales': day.upiSales,
    'Total Sales': day.totalSales,
    'Orders Count': day.ordersCount
  }));
};

export const prepareWeeklySalesForExport = (orders: Order[]) => {
  // Group orders by week
  const weeklyData: {[key: string]: {cashSales: number, upiSales: number, totalSales: number, ordersCount: number}} = {};
  
  orders.forEach(order => {
    const orderDate = new Date(order.timestamp);
    const weekStart = format(startOfWeek(orderDate), 'yyyy-MM-dd');
    const weekEnd = format(endOfWeek(orderDate), 'yyyy-MM-dd');
    const weekKey = `${weekStart} to ${weekEnd}`;
    
    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = {
        cashSales: 0,
        upiSales: 0,
        totalSales: 0,
        ordersCount: 0
      };
    }
    
    if (order.paymentMode === 'Cash') {
      weeklyData[weekKey].cashSales += order.totalAmount;
    } else {
      weeklyData[weekKey].upiSales += order.totalAmount;
    }
    
    weeklyData[weekKey].totalSales += order.totalAmount;
    weeklyData[weekKey].ordersCount += 1;
  });
  
  return Object.entries(weeklyData).map(([week, data]) => ({
    'Week': week,
    'Cash Sales': data.cashSales,
    'UPI Sales': data.upiSales,
    'Total Sales': data.totalSales,
    'Orders Count': data.ordersCount
  }));
};

export const prepareCurrentWeekSalesForExport = (orders: Order[]) => {
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today);
  const endOfCurrentWeek = endOfWeek(today);
  
  // Filter orders for current week
  const currentWeekOrders = orders.filter(order => {
    const orderDate = new Date(order.timestamp);
    return orderDate >= startOfCurrentWeek && orderDate <= endOfCurrentWeek;
  });
  
  return prepareWeeklySalesForExport([...currentWeekOrders]);
};

export const prepareLastWeekSalesForExport = (orders: Order[]) => {
  const today = new Date();
  const lastWeekStart = startOfWeek(subWeeks(today, 1));
  const lastWeekEnd = endOfWeek(subWeeks(today, 1));
  
  // Filter orders for last week
  const lastWeekOrders = orders.filter(order => {
    const orderDate = new Date(order.timestamp);
    return orderDate >= lastWeekStart && orderDate <= lastWeekEnd;
  });
  
  return prepareWeeklySalesForExport([...lastWeekOrders]);
};

export const prepareMonthlyLaserForExport = (orders: Order[]) => {
  // Group orders by month
  const monthlyData: {[key: string]: {cashSales: number, upiSales: number, totalSales: number, ordersCount: number}} = {};
  
  orders.forEach(order => {
    const orderDate = new Date(order.timestamp);
    const monthKey = format(orderDate, 'yyyy-MM');
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        cashSales: 0,
        upiSales: 0,
        totalSales: 0,
        ordersCount: 0
      };
    }
    
    if (order.paymentMode === 'Cash') {
      monthlyData[monthKey].cashSales += order.totalAmount;
    } else {
      monthlyData[monthKey].upiSales += order.totalAmount;
    }
    
    monthlyData[monthKey].totalSales += order.totalAmount;
    monthlyData[monthKey].ordersCount += 1;
  });
  
  return Object.entries(monthlyData).map(([month, data]) => ({
    'Month': format(new Date(`${month}-01`), 'MMMM yyyy'),
    'Cash Sales': data.cashSales,
    'UPI Sales': data.upiSales,
    'Total Sales': data.totalSales,
    'Orders Count': data.ordersCount
  }));
};

export const prepareCurrentMonthSalesForExport = (orders: Order[]) => {
  const today = new Date();
  const startOfCurrentMonth = startOfMonth(today);
  const endOfCurrentMonth = endOfMonth(today);
  
  // Filter orders for current month
  const currentMonthOrders = orders.filter(order => {
    const orderDate = new Date(order.timestamp);
    return orderDate >= startOfCurrentMonth && orderDate <= endOfCurrentMonth;
  });
  
  return prepareMonthlyLaserForExport([...currentMonthOrders]);
};

export const prepareLastMonthSalesForExport = (orders: Order[]) => {
  const today = new Date();
  const lastMonthStart = startOfMonth(subMonths(today, 1));
  const lastMonthEnd = endOfMonth(subMonths(today, 1));
  
  // Filter orders for last month
  const lastMonthOrders = orders.filter(order => {
    const orderDate = new Date(order.timestamp);
    return orderDate >= lastMonthStart && orderDate <= lastMonthEnd;
  });
  
  return prepareMonthlyLaserForExport([...lastMonthOrders]);
};

export const prepareTableSalesForExport = (data: TableSales[]) => {
  return data.map(table => ({
    'Table Number': table.tableNumber,
    'Date': table.date,
    'Total Sales': table.totalSales,
    'Orders Count': table.ordersCount
  }));
};

export const preparePurchasesForExport = (data: Purchase[]) => {
  return data.map(purchase => ({
    'Item Name': purchase.itemName,
    'Vendor': purchase.vendor,
    'Date': new Date(purchase.date).toLocaleDateString('en-IN'),
    'Quantity': purchase.quantity,
    'Unit Price': purchase.unitPrice,
    'Total Cost': purchase.totalCost
  }));
};

export const prepareDetailedSalesForExport = (orders: Order[]) => {
  return orders.map(order => ({
    'Order ID': order.id,
    'Date': format(new Date(order.timestamp), 'yyyy-MM-dd'),
    'Time': format(new Date(order.timestamp), 'HH:mm:ss'),
    'Table': order.tableNumber,
    'Payment Mode': order.paymentMode,
    'Total Amount': order.totalAmount,
    'Items Count': order.items.reduce((total, item) => total + item.quantity, 0),
    'Status': order.status
  }));
};

export const prepareAllReportsForExport = (
  orders: Order[],
  purchases: Purchase[],
  dailySales: DailySales[],
  tableSales: TableSales[]
) => {
  // Creating all exports
  const detailedSales = prepareDetailedSalesForExport(orders);
  const dailySalesExport = prepareDailySalesForExport(dailySales);
  const weeklySales = prepareWeeklySalesForExport(orders);
  const monthlySales = prepareMonthlyLaserForExport(orders);
  const currentWeekSales = prepareCurrentWeekSalesForExport(orders);
  const lastWeekSales = prepareLastWeekSalesForExport(orders);
  const currentMonthSales = prepareCurrentMonthSalesForExport(orders);
  const lastMonthSales = prepareLastMonthSalesForExport(orders);
  const tableSalesExport = prepareTableSalesForExport(tableSales);
  const purchasesExport = preparePurchasesForExport(purchases);
  
  // Export each to CSV
  exportToCSV(detailedSales, 'haven-cafe-detailed-sales');
  exportToCSV(dailySalesExport, 'haven-cafe-daily-sales');
  exportToCSV(weeklySales, 'haven-cafe-weekly-sales');
  exportToCSV(monthlySales, 'haven-cafe-monthly-sales');
  exportToCSV(currentWeekSales, 'haven-cafe-current-week-sales');
  exportToCSV(lastWeekSales, 'haven-cafe-last-week-sales');
  exportToCSV(currentMonthSales, 'haven-cafe-current-month-sales');
  exportToCSV(lastMonthSales, 'haven-cafe-last-month-sales');
  exportToCSV(tableSalesExport, 'haven-cafe-table-sales');
  exportToCSV(purchasesExport, 'haven-cafe-purchases');
};
 