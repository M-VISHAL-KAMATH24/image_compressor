import Header from './components/Header'
import BackgroundShapes from './components/BackgroundShapes'
import UploadZone from './components/UploadZone'

function App() {
  const handleFilesSelect = (files) => {
    console.log('Files selected:', files)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden relative">
      <BackgroundShapes />
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <UploadZone onFilesSelect={handleFilesSelect} />
      </main>
    </div>
  )
}

export default App
