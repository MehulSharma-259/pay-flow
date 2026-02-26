export default function Subheading({label} : {label: string}) {
  return (
    <>
      <h1 className="text-gray-400">
        {label}
      </h1>
    </>
  )
}