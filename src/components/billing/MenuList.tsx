import  { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import menuItems from '../../data/menu';
import { MenuItem, OrderItem } from '../../types';
import { formatCurrency } from '../../utils/format';

interface MenuListProps {
  onAddItem: (item: OrderItem) => void;
}

export default function MenuList({ onAddItem }: MenuListProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all unique categories
  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];
  
  // Filter items by category and search query
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
                         item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = () => {
    if (!selectedItem) return;
    
    const price = selectedItem.sizes && selectedSize 
      ? selectedItem.sizes[selectedSize] 
      : selectedItem.price;
    
    onAddItem({
      id: selectedItem.id,
      name: selectedItem.name,
      price,
      quantity,
      size: selectedSize || undefined,
    });
    
    // Reset selection
    setSelectedItem(null);
    setSelectedSize(null);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-9"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No menu items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setSelectedSize(item.sizes ? Object.keys(item.sizes)[0] : null);
                }}
                className={`p-3 rounded-md border cursor-pointer transition-all ${
                  selectedItem?.id === item.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <h3 className="font-medium">{item.name}</h3>
                {item.sizes ? (
                  <p className="text-sm text-gray-500">
                    {formatCurrency(Object.values(item.sizes)[0])} - {formatCurrency(Object.values(item.sizes)[Object.values(item.sizes).length - 1])}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">{formatCurrency(item.price)}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{item.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="p-4 border-t bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">{selectedItem.name}</h3>
          
          {selectedItem.sizes && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedItem.sizes).map(([size, price]) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-sm rounded-md border ${
                      selectedSize === size
                        ? 'bg-primary-600 text-white border-primary-700'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {size} - {formatCurrency(price)}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 rounded-l-md border border-gray-300 bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center py-1 border-t border-b border-gray-300"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 rounded-r-md border border-gray-300 bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="font-medium">
              Total: {formatCurrency((selectedItem.sizes && selectedSize 
                ? selectedItem.sizes[selectedSize] 
                : selectedItem.price) * quantity)}
            </p>
            <button
              onClick={handleAddItem}
              className="btn btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add to Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
 