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
      {/* banner section  */}
      <Banner />
      {/* running car  */}
      <RunningCar />
      {/* featured cars section  */}
      <FeaturedCars />
      {/* buying essentials  */}
      <BuyingEssentials />
      {/* review section  */}
      <Reviews />
      {/* counter section  */}
      <CounterSection />
    </div>
  );
};

export default Home;
