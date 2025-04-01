import './styles/App.css'
import { readMetadata } from './util/readMetadata'
import { MetadataSelector } from './components/metadata-selector/MetadataSelector'
import { ImagePreview }from './components/image-preview/ImagePreview'
import { useEffect, useState } from 'react'
import { ImageSender } from './components/image-sender/ImageSender'

function App() {
  const [imageBlob, setImageBlob] = useState(null)
  const [imageUrl, setImageUrl] = useState("")
  const [metadataList, setMetadataList] = useState([])

  useEffect(() => {
    if (imageBlob) {
      async function updateMetadataList(blob) {
        let newMetadataList = await readMetadata(blob)
        setMetadataList(newMetadataList)
      }
      updateMetadataList(imageBlob)
    }
  }, [imageBlob])

  function catchFileHandler(e) {
    let file = e.currentTarget.files[0]
    let url = URL.createObjectURL(file)
    setImageBlob(file)
    setImageUrl(url)
  }

  function cancelHandler() {
    return
  }

  function confirmHandler() {
    return
  }

  return (
    <div className="flex flex-col max-w-2xl space-y-5 w-full justify-center mx-auto">
      <ImageSender onSend={catchFileHandler}/>
      <ImagePreview src={imageUrl}/>
      <MetadataSelector data={metadataList} onCancel={cancelHandler} onConfirm={confirmHandler}/>
    </div>
  )
}

export default App