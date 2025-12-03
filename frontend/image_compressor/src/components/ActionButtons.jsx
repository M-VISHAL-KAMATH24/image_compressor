import { Play, Trash2, RotateCcw } from 'lucide-react'

export default function ActionButtons({ files, onCompress, onClear, isProcessing, disabled }) {
  if (files.length === 0) return null

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          {/* Compress Button */}
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

          {/* Clear Button */}
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
