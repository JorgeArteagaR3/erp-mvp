import { Bell, Settings, CheckCircle2 } from "lucide-react";

const Topbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900">
          EPR Tax Calculator
        </h1>
        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center gap-1.5 border border-green-200">
          <CheckCircle2 className="w-3 h-3" />
          Compliant
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 relative group">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
