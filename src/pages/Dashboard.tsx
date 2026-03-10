import {
  Package,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Upload,
  FileText,
  Search,
  Folder,
} from "lucide-react";

interface DashboardProps {
  onNavigate: (page: "dashboard" | "upload" | "products" | "reports") => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const stats = [
    {
      label: "Total Products",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Package,
      color: "blue",
    },
    {
      label: "Pending Tax",
      value: "€24,850",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "yellow",
    },
    {
      label: "Compliance Rate",
      value: "94.3%",
      change: "+2.1%",
      trend: "up",
      icon: CheckCircle2,
      color: "green",
    },
    {
      label: "Data Errors",
      value: "23",
      change: "-15.3%",
      trend: "down",
      icon: AlertTriangle,
      color: "red",
    },
  ];

  const recentUploads = [
    {
      id: 1,
      name: "Q1_2026_Supplier_Data.csv",
      date: "2026-03-08",
      status: "completed",
      products: 342,
    },
    {
      id: 2,
      name: "Winter_Collection_Materials.xlsx",
      date: "2026-03-05",
      status: "completed",
      products: 189,
    },
    {
      id: 3,
      name: "Spring_Catalog_Update.csv",
      date: "2026-03-01",
      status: "error",
      products: 56,
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="animate-slide-in">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">
          Overview of your EPR compliance status
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === "blue"
                      ? "bg-blue-50"
                      : stat.color === "yellow"
                        ? "bg-yellow-50"
                        : stat.color === "green"
                          ? "bg-green-50"
                          : "bg-red-50"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      stat.color === "blue"
                        ? "text-blue-600"
                        : stat.color === "yellow"
                          ? "text-yellow-600"
                          : stat.color === "green"
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    stat.trend === "up"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  <TrendIcon className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1 group-hover:scale-105 transition-transform">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Uploads
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentUploads.map((upload) => (
                <tr
                  key={upload.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Folder className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {upload.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {upload.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {upload.products} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        upload.status === "completed"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {upload.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        <button
          onClick={() => onNavigate("upload")}
          className="bg-white border-2 border-gray-200 rounded-xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:border-purple-500 hover:scale-105 hover:-translate-y-1 group"
        >
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <h4 className="font-semibold text-lg mb-1">Upload New Data</h4>
          <p className="text-sm text-gray-500">
            Import supplier CSV or Excel files
          </p>
        </button>

        <button
          onClick={() => onNavigate("reports")}
          className="bg-white border-2 border-gray-200 rounded-xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:border-purple-500 hover:scale-105 hover:-translate-y-1 group"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-50 group-hover:scale-110 transition-all">
            <FileText className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </div>
          <h4 className="font-semibold text-lg mb-1 text-gray-900">
            Generate Report
          </h4>
          <p className="text-sm text-gray-500">
            Create government-ready exports
          </p>
        </button>

        <button
          onClick={() => onNavigate("products")}
          className="bg-white border-2 border-gray-200 rounded-xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:border-purple-500 hover:scale-105 hover:-translate-y-1 group"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-50 group-hover:scale-110 transition-all">
            <Search className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </div>
          <h4 className="font-semibold text-lg mb-1 text-gray-900">
            Review Products
          </h4>
          <p className="text-sm text-gray-500">Check material breakdowns</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
