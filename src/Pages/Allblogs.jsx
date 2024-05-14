import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Allblogs = () => {
  const { isPending, data: AllBlogData } = useQuery({
    queryKey: ["AllBlogData"],
    queryFn: async () => {
      const blogs = axios
        .get("http://localhost:5000/blogs")
        .then((data) => data.data);

      return blogs;
    },
  });
  if (isPending) {
    return (
      <div className="flex justify-center">
        <HashLoader />
      </div>
    );
  }
  console.log(AllBlogData);
  return (
    <>
      <div>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
          {AllBlogData.map((blog) => (
            <div key={blog._id}>
              <div className="max-w-lg mx-auto">
                <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                  <div className="flex justify-center">
                    <img
                      className="rounded-t-lg p-4 w-full"
                      src={blog.imageURL}
                      alt=""
                    />
                  </div>

                  <div className="p-5">
                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                      {blog.title}
                    </h5>
                    <p className="font-normal text-gray-700 mb-3">
                      {blog.shortDescription}
                    </p>
                    <Link
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                      to={`/blog/${blog._id}`}
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
    </>
  );
};

export default Allblogs;
