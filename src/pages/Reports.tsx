import { useState } from "react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Q1-2026");
  const [generating, setGenerating] = useState(false);

  const reports = [
    {
      id: 1,
      name: "Q1 2026 EPR Tax Report",
      date: "2026-03-08",
      period: "Q1-2026",
      status: "ready",
      products: 1247,
      tax: 24850,
    },
    {
      id: 2,
      name: "Q4 2025 EPR Tax Report",
      date: "2025-12-20",
      period: "Q4-2025",
      status: "submitted",
      products: 1189,
      tax: 22340,
    },
    {
      id: 3,
      name: "Q3 2025 EPR Tax Report",
      date: "2025-09-15",
      period: "Q3-2025",
      status: "submitted",
      products: 1098,
      tax: 21205,
    },
  ];

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert("Report generated successfully!");
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Ready to Submit
          </span>
        );
      case "submitted":
        return (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            Submitted
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-slide-in">
        <h2 className="text-2xl font-bold text-gray-900">Government Reports</h2>
        <p className="text-gray-500 mt-1">
          Generate and download legally formatted EPR tax reports for Finnish
          authorities
        </p>
      </div>

      {/* Generate New Report */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl p-8 text-white animate-scale-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Generate New Report</h3>
            <p className="text-purple-100">
              Create an official EPR compliance report for submission to Finnish
              government
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="Q1-2026">Q1 2026</option>
              <option value="Q4-2025">Q4 2025</option>
              <option value="Q3-2025">Q3 2025</option>
            </select>
            <button
              onClick={handleGenerateReport}
              disabled={generating}
              className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Generating...
                </span>
              ) : (
                "📊 Generate Report"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Report History */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">
            Report History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Tax
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
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📄</span>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                          {report.name}
                        </p>
                        <p className="text-sm text-gray-500">{report.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {report.period}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {report.products} items
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      €{report.tax.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                        Download
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 font-medium text-sm transition-colors">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Format Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start space-x-3 mb-4">
            <span className="text-2xl">📋</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Report Format
              </h4>
              <p className="text-sm text-gray-600">
                All reports are generated in the official Finnish government
                format with required data fields and validation.
              </p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Product-level material breakdown
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Eco-modulation tax calculations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Company identification data
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Period summary statistics
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start space-x-3 mb-4">
            <span className="text-2xl">💾</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Export Options
              </h4>
              <p className="text-sm text-gray-600">
                Download reports in multiple formats for different use cases.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      Excel (.xlsx)
                    </p>
                    <p className="text-xs text-gray-500">
                      Editable spreadsheet format
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-gray-600">
                  →
                </span>
              </div>
            </button>
            <button className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📄</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">PDF</p>
                    <p className="text-xs text-gray-500">
                      Official submission format
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-gray-600">
                  →
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
