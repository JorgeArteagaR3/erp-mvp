import { LayoutDashboard, Upload, Package, FileText, User } from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: "dashboard" | "upload" | "products" | "reports") => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar = ({ currentPage, onNavigate, collapsed }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "upload", icon: Upload, label: "Upload Data" },
    { id: "products", icon: Package, label: "Products" },
    { id: "reports", icon: FileText, label: "Reports" },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          {!collapsed ? (
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <span className="font-semibold text-gray-900 text-[15px]">
                EPR Compliance
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center mx-auto shadow-sm">
              <span className="text-white font-bold text-sm">EP</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                  currentPage === item.id
                    ? "bg-purple-50 text-purple-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    currentPage === item.id
                      ? "text-purple-600"
                      : "text-gray-500"
                  }`}
                />
                {!collapsed && (
                  <span className="ml-3 font-medium text-[13px] animate-fade-in">
                    {item.label}
                  </span>
                )}
                {currentPage === item.id && (
                  <div className="absolute right-0 w-0.5 h-6 bg-purple-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div className="ml-3 animate-fade-in">
                <p className="text-sm font-medium text-gray-900">
                  Sustainability Manager
                </p>
                <p className="text-xs text-gray-500">Finnish Apparel Co.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
