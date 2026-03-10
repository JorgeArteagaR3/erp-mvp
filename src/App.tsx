import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Upload from "./pages/Upload";
import Reports from "./pages/Reports";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

type Page = "dashboard" | "upload" | "products" | "reports";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "upload":
        return <Upload />;
      case "products":
        return <Products />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="animate-fade-in">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
