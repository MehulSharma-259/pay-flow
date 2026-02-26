/** @format */

export default function Navbar() {
  return (
    <div className="bg-white">
      <nav className="flex justify-between items-center shadow-lg px-5 py-3">
        <div>Paytm App</div>

        <div className="flex justify-center items-center gap-2">
          <div>Hello</div>

          <div className="bg-gray-400 h-10 w-10 p-2 flex justify-center items-center rounded-full">
            MS
          </div>
        </div>
      </nav>
    </div>
  );
}
