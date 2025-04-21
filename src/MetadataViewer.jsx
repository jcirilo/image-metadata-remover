import { useState } from "react";

const SENSITIVE_TAGS = [
    'Author',
    'GPSLatitude',
    'GPSLongitude',
    'GPSPosition',
    'GPSAltitudeRef',
    'GPSAltitude',
    'Make',
    'Model',
    'DateTimeOriginal',
    'CreateDate',
    'ModifyDate',
    'SubSecDateTimeOriginal',
    'SerialNumber',
    'LensMake',
    'SerialNumber',
    'OwnerName',
]

const MetadataViewer = ({ metadata, onRemove}) => {
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
        <div className="container w-full">
            <div className="py-2 mb-0.5 text-2xl rounded-t-2xl">
                <strong className="text-slate-700 dark:text-white">Metadados</strong>
            </div>

            <ul className="w-full max-w-2xl">
                {entries.map(([key, value]) => {
                    let displayValue = value;
                    if (typeof value === 'object' && value.rawValue) {
                        displayValue = value.rawValue;
                    } else if (typeof value === 'object') {
                        displayValue = JSON.stringify(value, null, 2);
                    }

                    return (
                        <li key={key} onClick={() => handleToggle(key)} className="w-full first:rounded-t-2xl flex cursor-pointer mb-0.5 px-4 py-2 bg-white dark:bg-neutral-800 hover:bg-stone-200 dark:hover:bg-neutral-700">
                            <div className="flex flex-col w-full mb-2">
                                <strong>
                                    <small className="text-slate-700 dark:text-neutral-300 overflow-hidden"> {SENSITIVE_TAGS.includes(key) && <>⚠️</>} {key}</small>
                                </strong>
                                <p className="text-slate-500 dark:text-neutral-400">{displayValue}</p>
                            </div>
                            <div className="flex ml-4">
                                <input
                                    className="cursor-pointer"
                                    type="checkbox"
                                    checked={!!selected[key]}
                                    onChange={() => handleToggle(key)}
                                />
                            </div>
                        </li>
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