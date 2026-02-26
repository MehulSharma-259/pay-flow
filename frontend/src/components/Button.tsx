
export default function Button({label, onChange} : {label: string, onChange: () => void}) {
  return (
    <>
    <div className="flex flex-col justify-between gap-2 my-1">
      <button className="bg-gray-900 text-white text-sm font-semibold p-2 rounded-sm">
        {label}
      </button>
    </div>
    </>
  )
}