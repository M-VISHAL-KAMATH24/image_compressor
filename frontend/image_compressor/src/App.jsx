import { useState } from 'react'
import Header from './components/Header'
import BackgroundShapes from './components/BackgroundShapes'
import UploadZone from './components/UploadZone'
import FileList from './components/FileList'
import ActionButtons from './components/ActionButtons'

function App() {
  const [files, setFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesSelect = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleCompress = () => {
    setIsProcessing(true)
    // Backend call will go here
    setTimeout(() => setIsProcessing(false), 2000) // Demo
  }

  const handleClearAll = () => {
    setFiles([])
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
      </main>
    </div>
  )
}

export default App
