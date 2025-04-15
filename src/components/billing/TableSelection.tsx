import  { useAppContext } from '../../context/AppContext';

export default function TableSelection() {
  const { activeTableNumber, setActiveTableNumber } = useAppContext();
  
  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Select Table</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {tables.map((tableNumber) => (
          <button
            key={tableNumber}
            onClick={() => setActiveTableNumber(tableNumber)}
            className={`h-12 rounded-md border ${
              activeTableNumber === tableNumber
                ? 'bg-primary-600 text-white border-primary-700'
                : 'bg-white hover:bg-gray-50 border-gray-300'
            }`}
          >
            {tableNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
 