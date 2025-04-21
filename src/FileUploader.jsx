import { useState } from "react";

import MetadataViewer from "./MetadataViewer";
import ImageView from "./ImageView";
import MapView from "./MapView";
import VideoView from "./VideoView";

const LOCAL_SERVER_URL = "http://localhost:3001"

const FileUploader = () => {
    const [metadata, setMetadata] = useState(null);
    const [mediaUrl, setMediaUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [hasGeo, setHasGeo] = useState(false);
    const [geo, setGeo] = useState(null);
    
    const sendImageToServer = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch(`${LOCAL_SERVER_URL}/upload`, {
            method: 'POST', 
            body: formData
        });

        return response.json()
    }

    const downloadImageFromServer = async (selectedKeys, metadata) => {
        const response = await fetch(`${LOCAL_SERVER_URL}/remove-metadata`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: metadata.FileName,
                tags: selectedKeys
            }),
        })
        return response
    }

    const handleUploadFile = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                setLoading(true); 
                setMetadata(null);

                const data = await sendImageToServer(file);

                const fileUrl = URL.createObjectURL(file)
                const isImage = data.metadata.MIMEType.startsWith("image")
                const isVideo = data.metadata.MIMEType.startsWith("video")
                const hasGeo = (data.metadata.GPSLatitude && data.metadata.GPSLongitude)
                const geo = hasGeo ? [data.metadata.GPSLatitude, data.metadata.GPSLongitude] : null;

                setIsImage(isImage);
                setIsVideo(isVideo);
                setHasGeo(hasGeo);
                setGeo(geo);
                setMetadata(data.metadata);
                setMediaUrl(fileUrl);

            } catch (error) {
                console.error("Erro ao enviar imagem ao servidor:", error);
                alert("Erro ao enviar imagem ao servidor")
                setLoading(false);

            } finally {

                setLoading(false);
            }
        }
    }

    const handleRemoveMetadata = async (selectedKeys) => {

        if (!selectedKeys.length) {
            return alert("Nenhum metadado selecionado");
        }

        try {
            const response = await downloadImageFromServer(selectedKeys, metadata);

            // Extrai o nome do arquivo do header 'Content-Disposition'
            const contentDisposition = response.headers.get('Content-Disposition');
            let fileName = metadata.FileName;

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                console.log(contentDisposition)
                if (match) {
                    fileName = "sm_"+match[1]
                }
            }
            
            // Converte a resposta em um blob (arquivo binário)
            const blob = await response.blob();

            // Cria um link temporário para download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();

            // Limpa o objeto URL
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Erro ao remover metadados:', error);
            alert('Erro ao remover metadados');
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 space-y-6 text-white">
            <h2 className="text-2xl font-bold mb-2">
                Enviar Arquivo <small className="text-sm text-slate-500 dark:text-neutral-500">(tamanho máximo 10MB)</small>
            </h2>
            <input
                type="file"
                accept="image/*,video/*,audio/*,.pdf,.docx,.xlsx"
                onChange={handleUploadFile}
                className="cursor-pointer block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-800"
            />

            {loading && <p className="text-zinc-400">Carregando metadados...</p>}

            {isImage && <ImageView src={mediaUrl}/>}

            {isVideo && <VideoView src={mediaUrl}/>}
            
            {hasGeo && <MapView geoLatLong={geo}/>}
            
            {metadata && <MetadataViewer metadata={metadata} onRemove={handleRemoveMetadata}/>}

        </div>
    )
}

export default FileUploader;