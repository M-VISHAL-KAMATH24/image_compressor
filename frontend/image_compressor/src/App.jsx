import { useState } from 'react'
import Header from './components/Header'
import BackgroundShapes from './components/BackgroundShapes'
import UploadZone from './components/UploadZone'
import FileList from './components/FileList'
import ActionButtons from './components/ActionButtons'
import ResultsGrid from './components/ResultsGrid'

function App() {
  const [files, setFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [compressedFiles, setCompressedFiles] = useState([])

  const handleFilesSelect = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleCompress = () => {
    setIsProcessing(true)
    // Backend call or demo
    setTimeout(() => {
      setCompressedFiles(files.map((file, i) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        originalSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        compressedSize: `${(file.size * 0.4 / 1024 / 1024).toFixed(1)} MB`
      })))
      setIsProcessing(false)
      setFiles([])
    }, 2000)
  }

  const handleClearAll = () => {
    setFiles([])
  }

  const handleDownload = (url, name) => {
    const a = document.createElement('a')
    a.href = url
    a.download = name.replace(/\.[^/.]+$/, '_compressed.jpg')
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden relative">
      <BackgroundShapes />
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <UploadZone onFilesSelect={handleFilesSelect} />
        <FileList files={files} onRemoveFile={handleRemoveFile} />
        <ActionButtons 
          files={files} 
          onCompress={handleCompress}
          onClear={handleClearAll}
          isProcessing={isProcessing}
          disabled={false}
        />
        <ResultsGrid 
          compressedFiles={compressedFiles}
          onDownload={handleDownload}
        />
      </main>
    </div>
  )
}

export default App
