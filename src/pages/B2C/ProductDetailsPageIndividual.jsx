import { useParams } from "react-router-dom";
import SimilarProductsSection from "../../components/B2C/similar_product/SimilarProductsSection"; // ✅ Changed b2c to B2C
import IndividualProduct from "../../components/B2C/individual_product/IndividualProductDetailsPage"
import TrendingProductsSection from "../../components/B2C/trending_product/TrendingProductsSection"; // ✅ Changed b2c to B2C

const ProductDetailsPageIndividual = () => { 
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ========== INDIVIDUAL PRODUCT DETAILS ========== */}
      <IndividualProduct productId={id} />

      {/* ========== SIMILAR PRODUCTS SECTION ========== */}
      <div className="mt-12">
        <SimilarProductsSection />
      </div>

        {/* ========== TRENDING PRODUCTS SECTION ========== */}
      <div>
        <TrendingProductsSection />
      </div>
    </div>
  );
};

export default ProductDetailsPageIndividual;