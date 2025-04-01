import { useState } from "react"

export function MetadataItem ({title, description}) {
    const [isSelected, setSelect] = useState(false); 

    function handleMark () {
        return isSelected ? setSelect(false) : setSelect(true)
    }

    function handleSelect () {
        return handleMark()
    }

    return (
        <li
            className="first:rounded-t-2xl w-full min-w-full flex cursor-pointer mb-0.5 px-4 py-2  dark:bg-stone-800 dark:hover:bg-stone-700"
            onClick={handleMark}
        >
            <div className="flex flex-col w-full mb-2">
                <strong>
                    <small className="dark:text-stone-400"> {title} </small>
                </strong>
                <p> {description} </p>
            </div>
            <div className="flex ml-4">
                <input
                    className="cursor-pointer"
                    checked={isSelected}
                    onChange={handleSelect}
                    type="checkbox"
                />
            </div>
        </li>
    )
}