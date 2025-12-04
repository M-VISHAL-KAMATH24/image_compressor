import { Download, Package, Trash2 } from 'lucide-react'

export default function ZipDownloadCard({ zipUrl, onDownload, onClear, quality }) {
  if (!zipUrl) return null

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm border-2 border-emerald-200/50 rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-emerald-500/20 border-4 border-emerald-400/50 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <Package className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Batch Complete!
          </h2>
          <p className="text-xl text-gray-700 font-medium max-w-md mx-auto mb-2">
            Compressed at <span className="font-black text-2xl text-emerald-600">{Math.round(quality * 100)}%</span> quality
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
          <button
            onClick={onDownload}
            className="flex-1 max-w-md flex items-center justify-center space-x-3 px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
          >
            <Download className="w-6 h-6" />
            <span>Download ZIP (Q{Math.round(quality * 100)}%)</span>
          </button>
          
          <button
            onClick={onClear}
            className="px-8 py-6 bg-white/80 hover:bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3"
          >
            <Trash2 className="w-6 h-6" />
            <span>Compress More</span>
          </button>
        </div>
      </div>
    </div>
  )
}
