import { MainLayout, SidebarFilters, ProductGrid } from '../../components/B2C';

const ProductListingPage = () => {
  return (
    <MainLayout
      sidebar={<SidebarFilters />}
    >
      <div className="p-6">
        <ProductGrid />
      </div>
    </MainLayout> 
  );
};

export default ProductListingPage;