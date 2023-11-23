import Banner from "@/components/Home/Banner";
import BuyingEssentials from "@/components/Home/BuyingEssentials";
import FeaturedCars from "@/components/Home/FeaturedCars";
import RunningCar from "@/components/Home/RunningCar";
import CounterSection from "@/components/Shared/CounterSection";
import Reviews from "@/components/Shared/Reviews";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Home = () => {
  // dynamic title
  useDocumentTitle("Carx - Affordability at your fingertip", false);
  return (
    <div>
      <Banner />
      <RunningCar />
      <FeaturedCars />
      <BuyingEssentials />
      <Reviews />
      <CounterSection />
    </div>
  );
};

export default Home;
