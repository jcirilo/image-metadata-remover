import { MetadataList } from "./MetadataList";
import { MetadataFooter } from "./MetadataFooter";
import { MetadataHeader } from "./MetadataHeader";

export function MetadataSelector({data, title, onCancel, onConfirm}) {
    if (data.length == 0) {
        return (
            <div className="div container w-full">
                <MetadataHeader title={title}/>
                <p className="text-center">Metadados não encontrados</p>
            </div>
        )
    }

    return (
        <div className="div container w-full">
            <MetadataHeader/>
            <MetadataList data={data}/>
            <MetadataFooter onCancel={onCancel} onConfirm={onConfirm}/>
        </div>
    )
}