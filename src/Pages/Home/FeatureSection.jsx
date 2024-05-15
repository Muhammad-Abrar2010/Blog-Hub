import { motion } from "framer-motion";

const FeatureSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-8 py-12 bg-gray-100"
    >
      <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Feature 1
          </h3>
          <p className="text-gray-700">
            Discover amazing new recipes from top chefs around the world.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Feature 2
          </h3>
          <p className="text-gray-700">
            Learn cooking techniques and tips from culinary experts.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Feature 3
          </h3>
          <p className="text-gray-700">
            Save your favorite recipes and create personalized meal plans.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default FeatureSection;
