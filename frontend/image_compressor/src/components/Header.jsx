import { Image, Download } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center py-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Image className="w-8 h-8 text-white" />
          </div>
          <Download className="w-8 h-8 text-indigo-500" />
        </div>
        <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
          Compressify
        </h1>
        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Reduce image size by up to 90% while keeping crystal clear quality. Lightning fast.
        </p>
      </div>
    </header>
  )
}
