import { useState } from "react";

const SENSITIVE_TAGS = [
    // Dados Pessoais e de Autoria
    'Author',               // Nome do autor/criador
    'Creator',             // Software/pessoa que criou o arquivo
    'Copyright',           // Informações de copyright
    'Artist',              // Artista (em imagens/músicas)
    'OwnerName',           // Nome do proprietário
    'XMP-dc:Creator',       // Criador (padrão XMP)

    // Localização Geográfica
    'GPSLatitude',         // Latitude
    'GPSLongitude',        // Longitude
    'GPSAltitude',         // Altitude
    'GPSPosition',         // Coordenadas combinadas
    'GPSTimeStamp',        // Horário do registro GPS
    'GPSDateStamp',         // Data do registro GPS

    // Datas e Histórico
    'DateTimeOriginal',    // Data/hora da captura
    'CreateDate',          // Data de criação
    'ModifyDate',          // Data de modificação
    'TrackCreateDate',     // Data de criação (vídeos)
    'MediaCreateDate',      // Data de criação (mídia)

    // Dispositivo e Software
    'Make',                // Fabricante da câmera
    'Model',               // Modelo do dispositivo
    'Software',            // Software usado para edição
    'FirmwareVersion',     // Versão do firmware
    'SerialNumber',        // Número de série do dispositivo
    'HostComputer',         // Computador usado para transferência

    // Redes Sociais e Aplicativos
    'XMP-cc:AttributionName',  // Atribuição (Creative Commons)
    'XMP-photoshop:Credit',    // Crédito (Photoshop)
    'XMP-xmpRights:Owner',     // Dono dos direitos (XMP)
    'XMP-microsoft:CreatorApp',// App de criação (Microsoft)

    // Dados de Conexão
    'HistorySoftwareAgent', // User-Agent de edições
    'DocumentID',           // ID único (pode ser rastreável)
    'InstanceID',           // ID de instância (Adobe)
    'OriginalDocumentID'    // ID original (rastreamento)
]

const UNMUTABLE_TAGS = [
    // Metadados estruturais essenciais para o arquivo
    'ImageWidth',          // Largura da imagem (em pixels)
    'ImageHeight',         // Altura da imagem (em pixels)
    'BitsPerSample',       // Profundidade de cor (ex: 8 bits por canal)
    'Compression',         // Tipo de compressão (JPEG, PNG, etc)
    'ColorSpace',          // Espaço de cores (sRGB, Adobe RGB)
    'Orientation',         // Rotação da imagem
    'SamplesPerPixel',     // Número de componentes de cor (3 para RGB)
    'PhotometricInterpretation', // Método de armazenamento de pixels

    // Metadados específicos de arquivos RAW
    'MakerNotes',          // Dados proprietários da câmera
    'CameraSerialNumber',  // Número de série do equipamento
    'LensModel',           // Modelo da lente (em alguns RAWs)
    'InternalSerialNumber', // Número interno da câmera
    'OriginalRawFileName',  // Nome original do arquivo RAW

    // Metadados de vídeos e áudios
    'Duration',           // Duração do conteúdo
    'VideoFrameRate',     // Frames por segundo
    'AudioSampleRate',    // Taxa de amostragem do áudio
    'Codec',              // Codec usado (H.264, AAC, etc)
    'MediaDataSize',      // Tamanho dos dados de mídia
    'MediaTimeScale',      // Escala de tempo da mídia

    // Metadados de documentos
    'PDF/ID',             // Identificador único do PDF
    'Producer',           // Software que gerou o arquivo
    'Creator',            // Usuário criador do documento
    'DocChecksum',        // Checksum de verificação
    'EmbeddedFile',        // Arquivos embutidos no documento

    // Marcas e assinaturas digitais
    'Watermark',          // Marcas d'água digitais
    'DigitalSignature',   // Assinatura digital
    'XMP:History',       // Histórico de edições (Photoshop)
    'XMP:RegionInfo',     // Informações de regiões (redes sociais)

    // Dados gerados pelo sistema operacional
    'FileCreateDate',     // Data de criação (gerado pelo SO)
    'FileModifyDate',     // Data de modificação (gerado pelo SO)
    'FileAccessDate',     // Data de acesso (gerado pelo SO)
    'FileInode'          // Número inode (sistemas Unix-like)
]

const MetadataViewer = ({ metadata, onRemove }) => {
    const [selected, setSelected] = useState({});

    const entries = Object.entries(metadata).filter(
        ([, value]) => value !== null && value !== ''
    );

    entries.sort(([a], [b]) => {
        const aSensitive = SENSITIVE_TAGS.includes(a);
        const bSensitive = SENSITIVE_TAGS.includes(b);
        return aSensitive === bSensitive ? 0 : aSensitive ? -1 : 1;
    });

    const handleToggle = (key) => {
        setSelected(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleRemoveMetadata = async () => {
        const selectedKeys = Object.keys(selected).filter(k => selected[k]);
        await onRemove(selectedKeys);
    }

    return (
        <div className="container w-full space-y-0.5">
            <div className="py-2 mb-0.5 text-2xl rounded-t-2xl">
                <strong className="text-slate-700 dark:text-white">Metadados</strong>
            </div>

            <ul className="w-full max-w-2xl max-h-96 overflow-y-auto">
                {entries.map(([key, value]) => {
                    let displayValue = value;
                    if (typeof value === 'object' && value.rawValue) {
                        displayValue = value.rawValue;
                    } else if (typeof value === 'object') {
                        displayValue = JSON.stringify(value, null, 2);
                    }

                    return (
                        <>
                        {UNMUTABLE_TAGS.includes(key) ?
                        <li key={key} className="w-full first:rounded-t-2xl flex mb-0.5 px-4 py-2 bg-white dark:bg-neutral-800 ">
                            <div className="flex flex-col w-full mb-2">
                                <strong>
                                    <small className="text-slate-700 dark:text-neutral-300 overflow-hidden"> {SENSITIVE_TAGS.includes(key) && <>⚠️</>} {key}</small>
                                </strong>
                                <p className="text-slate-500 dark:text-neutral-400">{displayValue}</p>
                            </div>
                            <div className="flex ml-4">
                            </div>
                        </li>
                        :
                        <li key={key} onClick={() => handleToggle(key)} className="w-full first:rounded-t-2xl flex cursor-pointer mb-0.5 px-4 py-2 bg-white dark:bg-neutral-800 hover:bg-stone-200 dark:hover:bg-neutral-700">
                            <div className="flex flex-col w-full mb-2">
                                <strong>
                                    <small className="text-slate-700 dark:text-neutral-300 overflow-hidden"> {SENSITIVE_TAGS.includes(key) && <>⚠️</>} {key}</small>
                                </strong>
                                <p className="text-slate-500 dark:text-neutral-400">{displayValue}</p>
                            </div>
                            <div className="flex ml-4"> 
                                <input className="cursor-pointer" type="checkbox" checked={!!selected[key]} onChange={() => handleToggle(key)}/>
                            </div>
                        </li>
                        }
                        </>
                    );
                })}
            </ul>

            <div className="flex justify-between space-x-0.5">
                <div className="w-full text-red-700 bg-white hover:bg-stone-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 first:rounded-bl-2xl last:rounded-br-2xl">
                    <button className="w-full cursor-pointer py-4 px-2 dark:text-red-400">
                        <strong>Cancelar</strong>
                    </button>
                </div>
                <div className="w-full text-slate-900 hover:bg-neutral-300 bg-white dark:text-stone-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 first:rounded-bl-2xl last:rounded-br-2xl">
                    <button onClick={handleRemoveMetadata} className="w-full cursor-pointer py-4 px-2">
                        <strong>Remover</strong>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MetadataViewer;