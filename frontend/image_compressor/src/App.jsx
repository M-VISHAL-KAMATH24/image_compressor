import { useState } from 'react'
import Header from './components/Header'
import BackgroundShapes from './components/BackgroundShapes'
import UploadZone from './components/UploadZone'
import FileList from './components/FileList'
import ActionButtons from './components/ActionButtons'
import ResultsGrid from './components/ResultsGrid'
import axios from 'axios'

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

const handleCompress = async () => {
  if (files.length === 0) return
  
  setIsProcessing(true)
  
  const formData = new FormData()
  files.forEach(file => {
    formData.append('files', file)
  })
  
  try {
    const response = await axios.post('http://localhost:8080/api/compress/batch', formData, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    const url = URL.createObjectURL(response.data)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed-images-${Date.now()}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert('ZIP downloaded successfully!')
    
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
