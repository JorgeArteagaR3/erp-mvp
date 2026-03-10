import { useState, useEffect } from "react";
import {
  UploadIcon,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Database,
  FileCheck,
  Loader2,
  Package,
} from "lucide-react";

type UploadStep = "upload" | "processing" | "mapping" | "review" | "complete";

interface ColumnMapping {
  csvColumn: string;
  mappedTo: string;
  confidence: number;
  sample: string;
}

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState<UploadStep>("upload");
  const [processingProgress, setProcessingProgress] = useState(0);

  // Available target columns for mapping
  const availableColumns = [
    "Product Name",
    "Product SKU",
    "Material Type",
    "Material Percentage",
    "Product Weight (g)",
    "Product Category",
    "Supplier Name",
    "Country of Origin",
    "HS Code",
    "Unit Price",
    "Do Not Map",
  ];

  // Mock data for AI mapping results
  const initialMappings: ColumnMapping[] = [
    {
      csvColumn: "Product_Name",
      mappedTo: "Product Name",
      confidence: 98,
      sample: "Summer Cotton T-Shirt",
    },
    {
      csvColumn: "SKU",
      mappedTo: "Product SKU",
      confidence: 100,
      sample: "TS-2024-001",
    },
    {
      csvColumn: "Material_1",
      mappedTo: "Material Type",
      confidence: 95,
      sample: "Cotton",
    },
    {
      csvColumn: "Percentage_1",
      mappedTo: "Material Percentage",
      confidence: 97,
      sample: "80%",
    },
    {
      csvColumn: "Weight_Grams",
      mappedTo: "Product Weight (g)",
      confidence: 100,
      sample: "180",
    },
    {
      csvColumn: "Material_2",
      mappedTo: "Material Type",
      confidence: 95,
      sample: "Elastane",
    },
    {
      csvColumn: "Percentage_2",
      mappedTo: "Material Percentage",
      confidence: 97,
      sample: "5%",
    },
  ];

  const [mappings, setMappings] = useState<ColumnMapping[]>(initialMappings);

  const mockStats = {
    totalRows: 342,
    validRows: 338,
    errors: 4,
    products: 342,
  };

  const handleMappingChange = (index: number, newValue: string) => {
    const updatedMappings = [...mappings];
    updatedMappings[index] = {
      ...updatedMappings[index],
      mappedTo: newValue,
      confidence: 100, // Manual selection = 100% confidence
    };
    setMappings(updatedMappings);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    setCurrentStep("processing");
  };

  // Simulate AI processing
  useEffect(() => {
    if (currentStep === "processing") {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentStep("mapping"), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const handleApproveMapping = () => {
    setCurrentStep("complete");
  };

  const handleStartOver = () => {
    setUploadedFile(null);
    setCurrentStep("upload");
    setProcessingProgress(0);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 animate-slide-in">
        <div className="flex items-center justify-between">
          {[
            { step: "upload", label: "Upload File", icon: UploadIcon },
            { step: "processing", label: "AI Processing", icon: Sparkles },
            { step: "mapping", label: "Review Mapping", icon: Database },
            { step: "complete", label: "Complete", icon: CheckCircle2 },
          ].map((item, index) => {
            const Icon = item.icon;
            const isActive = currentStep === item.step;
            const isComplete =
              ["upload", "processing", "mapping", "complete"].indexOf(
                currentStep,
              ) > index;

            return (
              <div key={item.step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isComplete
                        ? "bg-green-500"
                        : isActive
                          ? "bg-purple-600"
                          : "bg-gray-200"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isComplete || isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isActive
                        ? "text-purple-600"
                        : isComplete
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < 3 && (
                  <div
                    className={`h-0.5 flex-1 mx-4 transition-all duration-300 ${
                      isComplete ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Upload */}
      {currentStep === "upload" && (
        <div className="space-y-6 animate-scale-in">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                dragActive
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={handleChange}
              />

              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center">
                  <UploadIcon className="w-10 h-10 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your file here, or{" "}
                    <label
                      htmlFor="file-upload"
                      className="text-purple-600 cursor-pointer hover:text-purple-700 transition-colors underline decoration-2 underline-offset-2"
                    >
                      browse
                    </label>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Supports CSV, XLSX, and XLS files up to 50MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm mb-1">
                    AI-Powered Mapping
                  </h4>
                  <p className="text-xs text-blue-700">
                    Automatically detects and maps your columns
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <FileCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 text-sm mb-1">
                    Data Validation
                  </h4>
                  <p className="text-xs text-green-700">
                    Identifies errors and missing data instantly
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900 text-sm mb-1">
                    Quick Processing
                  </h4>
                  <p className="text-xs text-purple-700">
                    Process thousands of products in seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: AI Processing */}
      {currentStep === "processing" && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 animate-scale-in">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center animate-bounce-subtle">
              <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                AI is analyzing your data...
              </h3>
              <p className="text-gray-500">
                Detecting columns, validating formats, and mapping to EPR
                requirements
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Processing {uploadedFile?.name}
                </span>
                <span className="font-semibold text-purple-600">
                  {processingProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-purple-600 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="pt-4 space-y-2 text-sm text-left">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Uploaded successfully</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Detected 342 rows</span>
              </div>
              {processingProgress > 50 && (
                <div className="flex items-center gap-2 text-green-600 animate-slide-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mapped 7 columns with AI</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review AI Mapping */}
      {currentStep === "mapping" && (
        <div className="space-y-6 animate-scale-in">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-r from-purple-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      AI Column Mapping
                    </h3>
                    <p className="text-sm text-gray-600">
                      Review and confirm the automatic mappings
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  98% Confidence
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {mappings.map((mapping, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                          {mapping.csvColumn}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <select
                          value={mapping.mappedTo}
                          onChange={(e) =>
                            handleMappingChange(index, e.target.value)
                          }
                          className={`text-sm font-semibold bg-white px-3 py-2 w-auto rounded-lg border border-gray-300 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 flex-1 cursor-pointer transition-all ${
                            mapping.mappedTo === "Do Not Map"
                              ? "text-gray-400"
                              : "text-gray-900"
                          }`}
                        >
                          {availableColumns.map((col) => (
                            <option key={col} value={col}>
                              {col}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="text-xs text-gray-500">
                        Sample:{" "}
                        <span className="font-medium">{mapping.sample}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div
                          className={`text-xs font-semibold ${
                            mapping.confidence >= 95
                              ? "text-green-600"
                              : mapping.confidence >= 85
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {mapping.confidence}% match
                        </div>
                        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              mapping.confidence >= 95
                                ? "bg-green-500"
                                : mapping.confidence >= 85
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${mapping.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Rows</p>
                  <p className="text-xl font-bold text-gray-900">
                    {mockStats.totalRows}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Valid Rows</p>
                  <p className="text-xl font-bold text-green-600">
                    {mockStats.validRows}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Errors</p>
                  <p className="text-xl font-bold text-red-600">
                    {mockStats.errors}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Products</p>
                  <p className="text-xl font-bold text-purple-600">
                    {mockStats.products}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleStartOver}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Start Over
            </button>
            <button
              onClick={handleApproveMapping}
              className="px-8 py-3 bg-linear-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Approve & Import Data
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Complete */}
      {currentStep === "complete" && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 animate-scale-in">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Import Successful!
              </h3>
              <p className="text-gray-500">
                {mockStats.validRows} products have been imported and are ready
                for compliance review
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-gray-900">
                  {mockStats.products}
                </p>
                <p className="text-sm text-gray-500">Products Added</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-600">
                  {mockStats.validRows}
                </p>
                <p className="text-sm text-gray-500">Valid Records</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleStartOver}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Upload Another File
              </button>
              <button className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200">
                View Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
