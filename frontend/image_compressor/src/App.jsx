import Header from './components/Header'
import BackgroundShapes from './components/BackgroundShapes'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden relative">
      <BackgroundShapes />
      <Header />
    </div>
  )
}

export default App
