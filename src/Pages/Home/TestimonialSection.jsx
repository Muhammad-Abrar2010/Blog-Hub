import { motion } from "framer-motion";

const TestimonialSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="px-8 py-12 bg-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center mb-8">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">John Doe</h3>
          <p className="text-gray-700">
            "I love using this platform to discover new recipes and improve my
            cooking skills."
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Jane Smith
          </h3>
          <p className="text-gray-700">
            "The cooking tips and techniques shared here have transformed the
            way I cook at home."
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Emily Johnson
          </h3>
          <p className="text-gray-700">
            "I've been able to create delicious and healthy meals for my family
            thanks to this platform."
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialSection;
