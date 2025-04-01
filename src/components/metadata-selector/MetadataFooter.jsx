import { MetadataFooterCancelButton } from "./MetadataFooterCancelButton"
import { MetadataFooterRemoveButton } from "./MetadataFooterRemoveButton"

export function MetadataFooter({onCancel, onConfirm}) {
    return (
        <ul className="flex justify-between space-x-0.5">
            <MetadataFooterCancelButton onCancel={onCancel} text="cancelar"/>
            <MetadataFooterRemoveButton onConfirm={onConfirm} text="remover"/>
        </ul>
    )
}