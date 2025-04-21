import FileUploader from './FileUploader'
import './styles/App.css'

function App() {
  return (
    <div className="flex flex-col max-w-2xl space-y-5 w-full justify-center mx-auto">
      <a href='/image-metadata-remover/'>Inicio</a>
      <FileUploader/>
    </div>
  )
}

export default App