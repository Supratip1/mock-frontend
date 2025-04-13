import { useCart } from '../context/CartContext';

export default function Cart() {
  const { state, dispatch } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-600">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {state.items.map(item => (
            <div key={item.id} className="p-6 flex items-center">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  
                  <span>{item.quantity}</span>
                  
                  <button
                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  className="mt-2 text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>${state.total.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => alert('Checkout functionality would go here!')}
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
