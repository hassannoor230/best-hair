import React from "react";

const AdminServices = () => {
  return (
    <div>
      <h1 className="text-3xl font-['Manrope'] font-bold text-white mb-10">Services</h1>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/60 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/60 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/60 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/60 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 text-white">Classic Haircut</td>
              <td className="px-6 py-4 text-white/70">Haircut</td>
              <td className="px-6 py-4 text-white">Rs. 500</td>
              <td className="px-6 py-4">
                <button className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
              </td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 text-white">Beard Grooming</td>
              <td className="px-6 py-4 text-white/70">Beard Grooming</td>
              <td className="px-6 py-4 text-white">Rs. 300</td>
              <td className="px-6 py-4">
                <button className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServices;
