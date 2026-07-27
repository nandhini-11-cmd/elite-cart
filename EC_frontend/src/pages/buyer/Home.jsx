import Hero from "../../components/buyer/Hero";
import CategorySection from "../../components/buyer/CategorySection";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../utils/roles";

const Home = () => {
  const { user } = useAuth();

if (user?.role === ROLES.SELLER) {
  return <Navigate to="/seller/dashboard" replace />;
}
  return (
    <>
      <Hero />

      <CategorySection />
    </>
  );
};

export default Home;