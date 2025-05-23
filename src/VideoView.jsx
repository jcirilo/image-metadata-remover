const VideoView = ({ src }) => {
    return (
        <div className="flex-col w-full ">
            <div className="text-2xl py-2 ">
                <strong className="text-slate-700 dark:text-white">Vídeo</strong>
            </div>
            <div className="aspect-video overflow-hidde bg-white hover:bg-neutral-100 rounded-2xl dark:bg-neutral-950 dark:hover:bg-neutral-900">
                {src && <video className="mx-auto h-full" src={src}/>}
            </div>
        </div>
    )
}

export default VideoView;