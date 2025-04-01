export function ImagePreview({ src }) {
    return (
        <div className="flex-col w-full ">
            <div className="text-2xl py-2 ">
                <strong >Preview</strong>
            </div>
            <div className="cursor-zoom-in aspect-video overflow-hidden dark:bg-black dark:hover:bg-stone-800 rounded-2xl">
                <img className="mx-auto h-full" src={src}/>
            </div>
        </div>
    )
}