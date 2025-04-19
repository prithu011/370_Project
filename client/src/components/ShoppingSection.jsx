import React from "react";
import NavigationArrows from "./NavigationArrows";
import ProductCard from "./ProductCard";

const ShoppingSection = () => {
  const products = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?placeholderIfAbsent=true",
      name: "Chelsea Home Kit 21 / 22",
      price: "150.10",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?placeholderIfAbsent=true",
      name: "West Ham Home Kit 21 / 22",
      price: "120.00",
    },
    // Add other products...
  ];

  return (
    <section className="mb-12 w-full max-w-[1030px] max-md:max-w-full">
      <header className="mb-8 flex justify-between items-center">
        <h2 className="text-xl font-semibold">👕 Shopping</h2>
        <NavigationArrows />
      </header>

      <div className="flex gap-6 items-center max-md:flex-wrap max-md:justify-center max-sm:flex-wrap max-sm:justify-center">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ShoppingSection;
