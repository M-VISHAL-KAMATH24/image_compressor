import ImageCard from './ImageCard'

export default function ResultsGrid({ compressedFiles, onDownload }) {
  if (compressedFiles.length === 0) return null

  return (
    <div className="mt-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Ready to Download
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your images have been compressed! Click download to save optimized versions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {compressedFiles.map((file, index) => (
          <ImageCard
            key={index}
            name={file.name}
            url={file.url}
            originalSize={file.originalSize}
            compressedSize={file.compressedSize}
            onDownload={() => onDownload(file.url, file.name)}
          />
        ))}
      </div>
      
      <div className="text-center mt-16 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl">
        <p className="text-lg font-semibold text-emerald-800 mb-2">
          Total Savings: {compressedFiles.length} images optimized ✨
        </p>
        <p className="text-sm text-emerald-600">Upload more photos to continue compressing</p>
      </div>
    </div>
  )
}
