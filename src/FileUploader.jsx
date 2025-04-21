import { useState } from "react";

import MetadataViewer from "./MetadataViewer";
import ImageView from "./ImageView";
import MapView from "./MapView";

const API_URL = import.meta.env.VITE_API_URL;

const FileUploader = () => {
    const [metadata, setMetadata] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [geoLatLong, setGeoLatLong] = useState(null);
    
    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        setLoading(true);
        setMetadata(null);

        const formData = new FormData();

        formData.append('image', file);

        try {
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro no upload');
            }

            const data = await response.json();

            setMetadata(data.metadata);

            if (data.metadata.MIMEType.startsWith("image")) {
                setPreviewUrl(URL.createObjectURL(file))
            } else {
                setPreviewUrl(null);
            }
            
            if (data.metadata.GPSLatitude && data.metadata.GPSLongitude) {
                setGeoLatLong([data.metadata.GPSLatitude, data.metadata.GPSLongitude])
            } else {
                setGeoLatLong(null);
            }

        } catch (error) {
            console.error('Erro ao enviar imagem:', error);
            alert('Erro ao enviar imagem');
        } finally {
            setLoading(false);
        }
    }

    // const handleFileChange2 = async (event) => {
    //     const file = event.target.files[0];
    // }

    return (
        <div className="w-full max-w-3xl mx-auto p-4 space-y-6 text-white">
            <h2 className="text-2xl font-bold mb-2">
                Enviar Arquivo <small className="text-sm text-slate-500 dark:text-neutral-500">(tamanho máximo 10MB)</small>
            </h2>
            <input
                type="file"
                accept="image/*,video/*,audio/*,.pdf,.docx,.xlsx"
                onChange={handleFileChange}
                className="cursor-pointer block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-800"
            />

            {loading && <p className="text-zinc-400">Carregando metadados...</p>}

            {previewUrl && <ImageView src={previewUrl}/>}

            {geoLatLong && <MapView geoLatLong={geoLatLong}/>}
            
            {metadata && <MetadataViewer metadata={metadata}/>}

        </div>
    )
}

export default FileUploader;