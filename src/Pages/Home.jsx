import Banner from "@/components/Home/Banner/Banner";
import BuyingEssentials from "@/components/Home/BuyingEssentials/BuyingEssentials";
import CounterSection from "@/components/Home/CounterSection/CounterSection";
import FeaturedCars from "@/components/Home/FeaturedCars/FeaturedCars";
import Reviews from "@/components/Home/Reviews/Reviews";
import RunningCar from "@/components/Home/RunningCar/RunningCar";
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
