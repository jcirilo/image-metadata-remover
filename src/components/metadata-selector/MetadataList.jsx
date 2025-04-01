import { MetadataItem } from "./MetadataItem"

export function MetadataList ({data}) {
    const cardItems = data.map(item => <MetadataItem key={item.id} title={item.title} description={item.description}/>)

    return (
        <ul className="w-full max-w-2xl">
            {cardItems}
        </ul>
    )
}