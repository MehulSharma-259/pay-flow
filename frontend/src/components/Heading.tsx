export default function Heading({label} : {label: string}) {
  return (
    <>
      <h1 className="text-3xl font-bold">
        {label}
      </h1>
    </>
  )
}