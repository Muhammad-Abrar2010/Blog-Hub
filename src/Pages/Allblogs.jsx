import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HashLoader } from "react-spinners";


const Allblogs = () => {
  const { isPending, data: AllBlogData } = useQuery({
    queryKey: ["AllBlogData"],
    queryFn: async () => {
      const blogs = axios
        .get("http://localhost:5000/blogs")
        .then((data) => data.data);

        return blogs
    },
  });
  if (isPending) {
    return <HashLoader />;
  }
  console.log(AllBlogData);
  return (
    <div>
      <h1>{AllBlogData.length}</h1>
    </div>
  );
};

export default Allblogs;
