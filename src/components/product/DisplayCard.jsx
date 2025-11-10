import React from "react";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export default function DisplayCard({ product, className }) {
  const navigate = useNavigate();

  const img =
    product?.imageUrls?.[0] ??
    product?.images?.[0] ??
    product?.image ??
    "/placeholder.jpg";

  return (
    <article
      onClick={() => navigate(`/products/${product.id}`)}
      className={cn(
        "group relative overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer",
        className
      )}
    >
      <div className="relative w-full h-80 sm:h-96 md:h-[500px]">
        <img
          src={img}
          alt={product.title || product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-10 w-full text-center text-white px-4">
          <p className="text-sm sm:text-base md:text-base text-white font-semibold uppercase">
            {product.title || product.name}
          </p>
          <button className="mt-3 px-6 text-white text-sm sm:text-base font-medium transition">
            SHOP NOW
          </button>
        </div>
      </div>
    </article>
  );
}
