import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const FeaturedBlogs = () => {
  const [topPosts, setTopPosts] = useState([]);

  const { isLoading, data: AllBlogData } = useQuery({
    queryKey: ["AllBlogData"],
    queryFn: async () => {
      const response = await axios.get("https://blog-hub-backend-zeta.vercel.app/blogs");
      return response.data;
    },
  });

  useEffect(() => {
    if (AllBlogData) {
      AllBlogData.forEach((post) => {
        post.wordCount = post.longDescription.split(/\s+/).length;
      });
      const sortedPosts = AllBlogData.sort((a, b) => b.wordCount - a.wordCount);
      const top10 = sortedPosts.slice(0, 10);
      setTopPosts(top10);
    }
  }, [AllBlogData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "serialNumber",
        header: "Serial Number",
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "title",
        header: "Blog Title",
      },
      {
        accessorKey: "userName",
        header: "Blog Owner",
      },
      {
        accessorKey: "userPhotoUrl",
        header: "Blog Owner Profile Picture",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        ),
      },
    ],
    []
  );

  const data = useMemo(() => topPosts, [topPosts]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Top 10 Posts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
