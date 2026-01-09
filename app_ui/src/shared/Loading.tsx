import { Database } from 'lucide-react';

function Loading() { 
  return (
  	<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
  	  <div className="text-center">
  	    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
  	      <Database className="w-10 h-10 text-white" />
  	    </div>
  	    <p className="text-slate-600">Завантаження...</p>
  	  </div>
  	</div>
  );
}

export default Loading;
