import { useState } from 'react';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useCart();
  const cartItem = state.items.find(item => item.id === product.id);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        id="products"
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition hover:scale-[1.02]"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
          <p className="mt-1 text-gray-500 text-sm line-clamp-2">{product.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>

            {cartItem ? (
              <div
                className="flex items-center space-x-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    if (cartItem.quantity === 1) {
                      dispatch({ type: 'REMOVE_ITEM', payload: product.id });
                    } else {
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: product.id, quantity: cartItem.quantity - 1 },
                      });
                    }
                  }}
                  className="p-1 text-gray-500 hover:text-red-500"
                >
                  {cartItem.quantity === 1 ? <Trash2 size={20} /> : <Minus size={20} />}
                </button>
                <span className="text-gray-700">{cartItem.quantity}</span>
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { id: product.id, quantity: cartItem.quantity + 1 },
                    })
                  }
                  className="p-1 text-gray-500 hover:text-green-500"
                >
                  <Plus size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'ADD_ITEM', payload: product });
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full relative animate-fadeIn">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full sm:w-1/2 h-64 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">${product.price}</p>

                {cartItem ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (cartItem.quantity === 1) {
                          dispatch({ type: 'REMOVE_ITEM', payload: product.id });
                        } else {
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: product.id, quantity: cartItem.quantity - 1 },
                          });
                        }
                      }}
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      {cartItem.quantity === 1 ? <Trash2 size={20} /> : <Minus size={20} />}
                    </button>

                    <span className="text-gray-700">{cartItem.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_QUANTITY',
                          payload: { id: product.id, quantity: cartItem.quantity + 1 },
                        })
                      }
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
