import { Play, Trash2, Settings, Image } from 'lucide-react'

export default function ActionButtons({ files, onCompress, onClear, isProcessing, quality, format, onQualityChange, onFormatChange, disabled }) {
  if (files.length === 0) return null

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100">
        
        {/* Quality Selector */}
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Quality</span>
          </label>
          <div className="flex items-center space-x-3">
            <select 
              value={quality} 
              onChange={(e) => onQualityChange(parseFloat(e.target.value))}
              className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-lg font-semibold"
              disabled={isProcessing}
            >
              <option value={0.8}>80% (Smallest)</option>
              <option value={0.85}>85% (Balanced)</option>
              <option value={0.9}>90% (High)</option>
              <option value={1.0}>100% (Lossless)</option>
            </select>
            <span className="font-bold text-xl text-gray-700 min-w-[3rem]">{Math.round(quality * 100)}%</span>
          </div>
        </div>

        {/* Format Selector - NEW */}
        <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
            <Image className="w-5 h-5" />
            <span>Output Format</span>
          </label>
          <select 
            value={format}
            onChange={(e) => onFormatChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 text-lg font-semibold"
            disabled={isProcessing}
          >
            <option value="jpg">JPG (Smallest)</option>
            <option value="png">PNG (Lossless)</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCompress}
            disabled={disabled || isProcessing || files.length === 0}
            className={`group relative flex-1 flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
              disabled || isProcessing || files.length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 hover:-translate-y-1'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Compress Images</span>
              </>
            )}
          </button>

          <button
            onClick={onClear}
            disabled={disabled || isProcessing}
            className={`flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
              disabled || isProcessing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-xl hover:shadow-rose-500/25 hover:scale-105'
            }`}
          >
            <Trash2 className="w-6 h-6" />
            <span>Clear All</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          {files.length} {files.length === 1 ? 'file' : 'files'} selected
        </p>
      </div>
    </div>
  )
}
