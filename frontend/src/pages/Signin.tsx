/** @format */

import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";

export default function Signin() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-300">
        <div className=" bg-white flex flex-col gap-2 h-max w-100 rounded-2xl p-8">
          <div className="flex flex-col gap-2 justify-center items-center">
            <Heading label="Sign in" />
            <Subheading label="Enter your credentials to access you account" />
          </div>
          <InputBox
            label="Email"
            placeholder="Enter your email"
            onChange={() => {}}
          />
          <InputBox
            label="Password"
            placeholder="Enter your password"
            onChange={() => {}}
          />

          <Button label="Sign up" onChange={() => {}}/>
          <BottomWarning label="Don't have an account? Signup"/>
        </div>
      </div>
    </>
  );
}
