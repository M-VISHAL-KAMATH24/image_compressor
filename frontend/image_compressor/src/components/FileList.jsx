import { X, Image, Trash2 } from 'lucide-react'

export default function FileList({ files, onRemoveFile }) {
  if (files.length === 0) return null

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Selected Files</h3>
              <p className="text-lg text-gray-500">{files.length} {files.length === 1 ? 'file' : 'files'} ready</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {files.map((file, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-6 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              
              {/* Image Preview */}
              <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden mb-4">
                <Image className="w-16 h-16 text-gray-400" />
                <span className="absolute text-xs text-gray-500 font-medium bg-white/90 px-2 py-1 rounded-lg">
                  {file.name.split('.').pop()?.toUpperCase()}
                </span>
              </div>

              {/* File Info */}
              <div className="space-y-2 mb-4">
                <p className="font-semibold text-gray-900 text-sm truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => onRemoveFile(index)}
                className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-3xl shadow-2xl border-4 border-white flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all duration-200 group-hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
