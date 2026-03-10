import { useState } from "react";
import {
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  sku: string;
  materials: { type: string; percentage: number }[];
  weight: number;
  tax: number;
  status: "compliant" | "error" | "warning";
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const products: Product[] = [
    {
      id: 1,
      name: "Organic Cotton T-Shirt",
      sku: "TS-001",
      materials: [
        { type: "Cotton", percentage: 95 },
        { type: "Elastane", percentage: 5 },
      ],
      weight: 180,
      tax: 2.45,
      status: "compliant",
    },
    {
      id: 2,
      name: "Winter Wool Jacket",
      sku: "JK-045",
      materials: [
        { type: "Wool", percentage: 70 },
        { type: "Polyester", percentage: 30 },
      ],
      weight: 850,
      tax: 12.8,
      status: "compliant",
    },
    {
      id: 3,
      name: "Summer Dress",
      sku: "DR-022",
      materials: [{ type: "Polyester", percentage: 100 }],
      weight: 320,
      tax: 5.76,
      status: "warning",
    },
    {
      id: 4,
      name: "Sports Leggings",
      sku: "SP-089",
      materials: [{ type: "Nylon", percentage: 80 }],
      weight: 0,
      tax: 0,
      status: "error",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <span className="px-3 py-1 inline-flex items-center gap-1.5 text-xs leading-5 font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 className="w-3 h-3" />
            Compliant
          </span>
        );
      case "error":
        return (
          <span className="px-3 py-1 inline-flex items-center gap-1.5 text-xs leading-5 font-semibold rounded-full bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3" />
            Error
          </span>
        );
      case "warning":
        return (
          <span className="px-3 py-1 inline-flex items-center gap-1.5 text-xs leading-5 font-semibold rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
            <AlertTriangle className="w-3 h-3" />
            Warning
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center animate-slide-in">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Catalog</h2>
          <p className="text-gray-500 mt-1">
            Review and manage product material data
          </p>
        </div>
        <button className="px-4 py-2 bg-linear-to-r from-purple-600 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 animate-scale-in">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2">
            {["all", "compliant", "warning", "error"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  filterStatus === status
                    ? "bg-purple-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Materials
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tax (€)
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">{product.sku}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.materials.map((material, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                        >
                          {material.type} {material.percentage}%
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.weight > 0 ? (
                      <span className="text-sm text-gray-900">
                        {product.weight}g
                      </span>
                    ) : (
                      <span className="text-sm text-red-600 font-medium">
                        Missing
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.tax > 0 ? (
                      <span className="text-sm font-medium text-gray-900">
                        €{product.tax.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                        Edit
                      </button>
                      <button className="text-gray-400 hover:text-red-600 font-medium text-sm transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Total Tax Liability</p>
          <p className="text-3xl font-bold text-gray-900">
            €{products.reduce((sum, p) => sum + p.tax, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Data Quality</p>
          <p className="text-3xl font-bold text-green-600">
            {Math.round(
              (products.filter((p) => p.status === "compliant").length /
                products.length) *
                100,
            )}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;
