import React from "react";
import { Routes, Route } from "react-router-dom";
import WomenwearRoute from "./WomenwearRoute";
import IndividualProductDetailsPage from "../components/B2C/individual_product/IndividualProductDetailsPage"
import ProductLayout from "../layout/ProductLayout";
import MainLayout from "../layout/mainLayout";
import { AuthProvider } from "../context/AuthContext";
import { useProducts } from "../hooks/useProducts";
import ProductDetailsPageIndividual from "../pages/B2C/ProductDetailsPageIndividual";
import Home from "../pages/B2C/homePage/homePage"; // ✅ FIXED: Changed b2c to B2C
import ProfilePage from "../pages/B2C/Profilepage/ProfilePage";
import CheckoutPage from "../pages/B2C/cartPage/CheckoutPage";
import CartPage from "../pages/B2C/cartPage/cartPage";

export default function AppRoutes() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    
    <AuthProvider>

    <Routes>
      {/* 🧷 Product listing page (with sidebar + ads inside main layout) */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/womenwear"
        element={
          <MainLayout>
            <ProductLayout products={products}>
              <WomenwearRoute products={products} />
            </ProductLayout>
          </MainLayout>
        }
      />

      {/* 🧷 Product details page (no sidebar, only header/footer) */}
      <Route
        path="/products/:id"
        element={
          <MainLayout>
            <ProductDetailsPageIndividual />
          </MainLayout>
        }
      />

      {/* 🧷 Root → redirect to womenwear */}
      <Route
        path="/womenwear"
        element={
          <MainLayout>
            <ProductLayout products={products}>
              <WomenwearRoute products={products} />
            </ProductLayout>
          </MainLayout>
        }
      />

      {/* Profile Page Components */}
     <Route
        path="/your-profile"
        element={
            <ProfilePage />
        }
      />

      <Route
        path="/checkout"
        element={
          <MainLayout>
            <CheckoutPage />
          </MainLayout>
        }
      />


<Route
        path="/cart"
        element={
          <MainLayout>
            <CartPage />
          </MainLayout>
          
        }
      />

    </Routes>
    </AuthProvider>
    </>
  );
}