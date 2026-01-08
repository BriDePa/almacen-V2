// Sistema de clases utilitarias para Tailwind — diseño moderno
export const buttonClasses = {
  primary:
    "inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-sm hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition",
  secondary:
    "inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none transition",
  danger:
    "inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 transition",
  warning:
    "inline-flex items-center px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition",
  success:
    "inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition",
};

export const formClasses = {
  input:
    "w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition",
  label: "block text-sm font-medium text-gray-700 mb-1",
  select:
    "w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200",
  textarea:
    "w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200",
};

export const layoutClasses = {
  card: "bg-white shadow-lg rounded-xl p-6",
  tableContainer: "overflow-x-auto bg-white shadow rounded-lg",
  table: "min-w-full divide-y divide-gray-200",
  tableHeader:
    "bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider",
  tableRow: "bg-white even:bg-gray-50",
};
