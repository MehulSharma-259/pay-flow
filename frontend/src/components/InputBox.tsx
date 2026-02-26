
export default function InputBox({label, placeholder, onChange} : {label: string, placeholder: string, onChange: () => void}) {
  return (
    <>
    <div className="flex flex-col justify-between gap-2 my-1">
      <label className="font-semibold" htmlFor="">{label}</label>
      <input className="border-[1.5px] border-gray-200 rounded-sm p-2 hover:border-blue-300 focus:border-blue-300 focus:outline-none" type="text" placeholder={placeholder} onChange={onChange}></input>
    </div>
    </>
  )
}