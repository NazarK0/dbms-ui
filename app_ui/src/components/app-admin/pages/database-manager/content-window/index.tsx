import { Folder } from "lucide-react";

export default function ContentWindow() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex items-center justify-center h-full">
      <div className="text-center text-gray-400">
        <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg">Select an item to view details</p>
      </div>
    </div>
  );
}