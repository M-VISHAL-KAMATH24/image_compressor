import { useState } from 'react'
import Header from './components/Header'
import BackgroundShapes from './components/BackgroundShapes'
import UploadZone from './components/UploadZone'
import FileList from './components/FileList'
import ActionButtons from './components/ActionButtons'
import ZipDownloadCard from './components/ZipDownloadCard'
import axios from 'axios'

function App() {
  const [files, setFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [zipUrl, setZipUrl] = useState(null)
  const [quality, setQuality] = useState(0.85)  // NEW: quality state

  const handleFilesSelect = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleCompress = async () => {
    if (files.length === 0) return
    
    setIsProcessing(true)
    
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    
    try {
      const response = await axios.post(`http://localhost:8080/api/compress/batch?quality=${quality}`, formData, {
        responseType: 'blob'
      })
      
      const url = URL.createObjectURL(response.data)
      setZipUrl(url)
      
    } catch (error) {
      console.error('Compression failed:', error)
      alert('Compression failed. Check console for details.')
    } finally {
      setIsProcessing(false)
      setFiles([])
    }
  }

  const handleClearAll = () => {
    setFiles([])
  }

  const handleZipDownload = () => {
    if (zipUrl) {
      const a = document.createElement('a')
      a.href = zipUrl
      a.download = `compressed-images-q${Math.round(quality*100)}-${Date.now()}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const clearZip = () => {
    if (zipUrl) {
      URL.revokeObjectURL(zipUrl)
      setZipUrl(null)
    }
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
          quality={quality}        // NEW: pass quality
          onQualityChange={setQuality}
          disabled={false}
        />
        <ZipDownloadCard 
          zipUrl={zipUrl}
          onDownload={handleZipDownload}
          onClear={clearZip}
          quality={quality}        // NEW: show quality used
        />
      </main>
    </div>
  )
}

export default App
