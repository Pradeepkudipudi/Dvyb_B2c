import React, { useState, useEffect } from "react";
import { Minus, Plus, Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cartService } from "../../../services/cartService";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Subscribe to Firestore cart in real-time
  useEffect(() => {
    let unsubscribe;

    const loadCart = async () => {
      try {
        unsubscribe = await cartService.subscribeToCart((cartData) => {
          setCartItems(cartData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error loading cart:", error);
        setLoading(false);
      }
    };

    loadCart();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // ✅ Remove item from cart (Firestore)
  const handleRemove = async (id) => {
    try {
      await cartService.removeFromCart(id);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Update quantity (Firestore)
  const handleQuantityChange = async (id, delta) => {
    try {
      const item = cartItems.find((i) => i.productId === id || i.id === id);
      if (!item) return;
      const newQuantity = Math.max(1, (item.quantity || 1) + delta);
      await cartService.updateCartItemQuantity(id, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ✅ Go to Checkout
  const handleProceedToCheckout = () => navigate("/checkout", { state: { cartItems } });

  // ✅ Totals
  const subtotal = cartItems.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const discount = subtotal * 0.12;
  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = subtotal - discount + shipping;

  const fontStyles =
    "font-[Outfit] font-medium uppercase tracking-[0.27px] leading-[100%] text-[#000]";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your cart...
      </div>
    );

  return (
    <div className="min-h-screen bg-white py-10 mt-20 px-6 md:px-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div className="flex items-center gap-3">
          <h1 className={`${fontStyles} text-[20px] font-medium md:text-[22px]`}>
            Your Shopping <span className="">Cart</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SECTION - CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center py-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[120px] h-[150px] object-cover rounded-md"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-[18px] font-medium text-gray-800">{item.name}</h2>
                  <p className="text-[14px] text-gray-600">
                    COLOR: {item.color || "Default"} | SIZE: {item.size || "M"}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.productId || item.id, -1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>
                      <span className="px-3 text-[14px]">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId || item.id, 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[14px] text-gray-500 mt-2">Ships in 3–5 business days.</p>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <p className="text-[18px] font-semibold text-gray-800">
                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </p>
                  <div className="flex gap-4">
                    <button className="hover:text-red-500 text-gray-400">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRemove(item.productId || item.id)}
                      className="hover:text-red-500 text-gray-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SECTION (Cart Summary) */}
        <div className="p-6 rounded-md shadow-sm h-fit border border-transparent">
          <h2 className="font-[Outfit] text-[18px] font-medium uppercase tracking-[0.27px] text-[#000] mb-5">
            Cart Summary
          </h2>

          <div className="border border-gray-300 rounded-sm p-4 space-y-3">
            <div className="flex justify-between text-[15px]">
              <span className="font-medium">Cart Total</span>
              <span className="font-medium">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[15px]">
              <span className="font-medium">Total Discount</span>
              <span className="text-[#000] font-medium">(–) ₹{discount.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-[15px]">
                <span className="font-medium">Shipping</span>
                <span className="font-medium">₹{shipping}</span>
              </div>
              <p className="text-[13px] text-gray-600 mt-1">
                Shipping Charges To Be Calculated On Checkout
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span className="font-[Outfit] text-[16px] font-medium uppercase text-[#000]">
                Total Payable
              </span>
              <span className="font-[Outfit] text-[22px] font-semibold text-[#000]">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>

          <hr className="border-gray-300 mt-4 mb-5" />

          <div className="space-y-3">
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#9C0000] text-white py-3 text-[15px] font-[Outfit] font-medium uppercase tracking-[0.27px] rounded-sm hover:bg-[#7A0000] transition"
            >
              Proceed To Checkout
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full border border-[#9C0000] text-[#9C0000] py-3 text-[15px] font-[Outfit] font-medium uppercase tracking-[0.27px] rounded-sm hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;