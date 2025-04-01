import * as exifr from 'exifr';

export async function readMetadata(blob) {
    try {
        const metadata = await exifr.parse(blob, true);
        const formattedData = []
        
        if (metadata.GPSLatitude && metadata.GPSLongitude) {
            formattedData.push({
                id: formattedData.length,
                title: 'Geolocalização',
                description: `${metadata.latitude} ${metadata.longitude}`
            })
        }

        if (metadata.Flash) {
            formattedData.push({
                id: formattedData.length,
                title: 'Flash',
                description: `${metadata.Flash}`                
            })
        }

        if (metadata.DateTimeOriginal) {
            let formatter = new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'});
            formattedData.push({
                id: formattedData.length,
                title: 'Data',
                description: `${formatter.format(metadata.DateTimeOriginal)}`
            })
            
            formatter = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'});

            formattedData.push({
                id: formattedData.length,
                title: 'Hora',
                description: `${formatter.format(metadata.DateTimeOriginal)}`
            })
        }

        if (metadata.Make || metadata.Model) {
            formattedData.push({
                id: formattedData.length,
                title: 'Dispositivo',
                description: `${metadata.Make} ${metadata.Model}`
            })
        }

        return formattedData
    } catch (err) {
        console.error('Erro ao ler metadados:', err);
  }
}