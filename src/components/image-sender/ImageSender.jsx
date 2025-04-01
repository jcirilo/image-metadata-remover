export function ImageSender ({onSend}) {
    return (
      <>
        <div className="text-2xl">
          <strong>Arquivo</strong>
        </div>
        <input
          className="bg-stone-800 px-4 py-2 rounded-xl dark:hover:bg-stone-700 cursor-pointer"
          type="file"
          accept="image/*"
          onChange={onSend}
        />
      </>
    )  
  }