import CategoryCarousel from "../../../components/utils/CategoryCarousel";
import ProductGrid from "../../../components/product/productGrid";
import SectionTitle from "../../../components/utils/SectionTitle";
import homeBanner from "../../../assets/B2C/landing/banner01.svg";
import ClosetIconsSection from "../../../components/B2C/home/ClosetIconsSection";
import { useProducts } from "../../../hooks/useProducts";
import { useStaticProducts } from "../../../hooks/useStaticProducts";
import LuxuryPicks from "../../../components/B2C/home/LuxuryPicks";
import SpotlightCollections from "../../../components/B2C/home/SpotlightCollections";
import BestProducts from "../../../components/B2C/home/BestProducts";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { staticProducts, loading, error } = useStaticProducts();
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-20">Loading…</div>;
  if (error) return <div className="text-center text-iserror py-20">{error}</div>;

  // Safe array conversion
  const productsArray = Array.isArray(staticProducts) ? staticProducts : [];

  // Filter products based on category
  const wedding = productsArray.filter((p) => p.category === "Wedding");
  const discount = productsArray.filter((p) => p.category === "Discount");
  const bestsellers = productsArray.filter((p) => p.category === "Bestselling").slice(0, 8);
  const luxuryPicks = productsArray.filter((p) => p.category === "Luxury").slice(0, 4);
  const closetIcons = productsArray.filter((p) => p.category === "Closet").slice(0, 8);

  return (
    <div className="mt-38">
      {/* 1. HERO BANNER */}
      <section className="w-full max-w-[95vw] md:h-[90vh] aspect-3/2 sm:aspect-16/7 md:aspect-16/7 lg:aspect-16/5 m-2 md:m-4 lg:mx-7 mx-auto overflow-hidden flex justify-center items-center">
        <img
          src={homeBanner}
          onClick={() => navigate('/womenwear')}
          alt="New Year Sale"
          className="w-full h-full object-fill object-center cursor-pointer hover:opacity-95 transition-opacity"
        />
      </section>

      {/* 2. WEDDING TALES */}
      {wedding.length > 0 && (
        <section className="container mx-auto py-12 px-4">
          <SectionTitle viewAll>Wedding Tales</SectionTitle>
          <ProductGrid products={wedding} columns={3} />
        </section>
      )}

      {/* 3. SHOP BY CATEGORY */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <SectionTitle viewAll>Shop by Category</SectionTitle>
          <CategoryCarousel />
        </div>
      </section>

      {/* 4. DISCOUNT COLLECTION */}
      {discount.length > 0 && (
        <section className="container mx-auto py-12 px-4">
          <SectionTitle viewAll>Discount Collection</SectionTitle>
          <ProductGrid products={discount} columns={4} />
        </section>
      )}

      {/* 5. LUXURIOUS PICKS OF THE DAY */}
      {luxuryPicks.length > 0 && (
        <section className="container mx-auto py-12 px-4">
          <SectionTitle>Luxurious Picks of the Day</SectionTitle>
          <LuxuryPicks products={luxuryPicks} columns={4} />
        </section>
      )}

      {/* 6. SPOTLIGHT OF THE DAY */}
      <section className="container mx-auto py-12 px-4">
        <SectionTitle>Spotlight of the Day</SectionTitle>
        <SpotlightCollections />
      </section>

      {/* 7. BESTSELLING */}
      {bestsellers.length > 0 && (
        <section className="container mx-auto py-12 px-4">
          <SectionTitle viewAll>Bestselling</SectionTitle>
          <BestProducts products={bestsellers} columns={2} />
          {wedding.length > 0 && <ProductGrid products={wedding} columns={3} />}
        </section>
      )}

      {/* 8. CLOSET ICONS */}
      {closetIcons.length > 0 && (
        <section className="container mx-auto py-12 px-4">
          <SectionTitle viewAll>Closet icons</SectionTitle>
          <ClosetIconsSection products={closetIcons} columns={5} />
          {discount.length > 0 && <ProductGrid products={discount} columns={4} />}
          {bestsellers.length > 0 && <BestProducts products={bestsellers} columns={3} />}
        </section>
      )}
    </div>
  );
}