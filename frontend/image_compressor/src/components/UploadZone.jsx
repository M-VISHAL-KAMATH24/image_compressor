import { useDropzone } from 'react-dropzone'
import { Upload, Image, File } from 'lucide-react'

export default function UploadZone({ onFilesSelect }) {
  const onDrop = (acceptedFiles) => {
    onFilesSelect(acceptedFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: true,
    maxSize: 50 * 1024 * 1024 // 50MB
  })

  return (
    <section className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative border-4 border-dashed rounded-3xl p-16 mb-8 transition-all duration-500 text-center group cursor-pointer hover:scale-[1.02] ${
          isDragActive
            ? 'border-indigo-400 bg-indigo-50/80 shadow-2xl backdrop-blur-sm'
            : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-2xl'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-6">
          <div className={`w-24 h-24 mx-auto p-6 rounded-3xl transition-all duration-300 group-hover:scale-110 ${
            isDragActive 
              ? 'bg-indigo-500 shadow-indigo-500/25' 
              : 'bg-white shadow-lg group-hover:shadow-indigo-200'
          }`}>
            <Upload className={`w-12 h-12 mx-auto transition-colors ${
              isDragActive ? 'text-white' : 'text-indigo-500 group-hover:text-indigo-600'
            }`} />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {isDragActive ? 'Drop your photos here!' : 'Drop photos here or click to select'}
            </h3>
            <p className="text-xl text-gray-500 font-medium">
              Supports JPEG, PNG, WebP • Max 50MB per file
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Image className="w-4 h-4" />
            <span>Supports most image formats</span>
            <File className="w-4 h-4" />
          </div>
        </div>
        
        {isDragActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl animate-pulse" />
        )}
      </div>
    </section>
  )
}
