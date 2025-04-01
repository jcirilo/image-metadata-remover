export function MetadataFooterRemoveButton ({text}) {
    return (
        <li className="bg-stone-800 w-full dark:hover:bg-stone-700 first:rounded-bl-2xl last:rounded-br-2xl">
            <button className="w-full cursor-pointer py-4 px-2">
                <strong>{text}</strong>
            </button>
        </li>
    )
}