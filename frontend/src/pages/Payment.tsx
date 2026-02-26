/** @format */

import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import User from "../components/User";

export default function Payment() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="flex flex-col justify-center gap-2 w-100 bg-white shadow-xl/30 h-max rounded-2xl p-10">
        <div className="text-center">
          <Heading label="Send Money" />
        </div>
          <User username="Mehul Sharma" buttonReq={false} onChange={() => {}} />
          <InputBox
            label="Amount (in Rs)"
            onChange={() => {}}
            placeholder="Enter amount"
          />
          <Button label="Initiate Transfer" onChange={() => {}} />
        </div>
      </div>
    </>
  );
}
