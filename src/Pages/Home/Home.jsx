import FeatureSection from "./FeatureSection";
import Newsletter from "./Newsletter";
import RecentBlogs from "./RecentBlogs";
import TestimonialSection from "./TestimonialSection";
const Home = () => {
  return (
    <div className="m-4 lg:p-4">
      <FeatureSection></FeatureSection>
      <br />
      <hr />

      <RecentBlogs></RecentBlogs>
      <br />
      <hr />
      <TestimonialSection></TestimonialSection>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
