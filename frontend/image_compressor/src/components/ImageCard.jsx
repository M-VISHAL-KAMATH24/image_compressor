import { Download, Image, CheckCircle } from 'lucide-react'

export default function ImageCard({ name, url, originalSize, compressedSize, onDownload }) {
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl border border-white/50 overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2">
      {/* Image Preview */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50">
        <img 
          src={url} 
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-emerald-500/90 text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center space-x-1 backdrop-blur-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Compressed</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h4 className="font-bold text-xl text-gray-900 truncate mb-4">{name}</h4>
        
        {/* Size Comparison */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Original</span>
            <span className="font-mono text-gray-700">{originalSize}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-2xl h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-2xl shadow-md" style={{width: '85%'}} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Compressed</span>
            <span className="font-mono font-bold text-emerald-600">{compressedSize}</span>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={onDownload}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center space-x-3 group-hover:scale-105"
        >
          <Download className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          <span>Download Optimized Image</span>
        </button>
      </div>
    </div>
  )
}
