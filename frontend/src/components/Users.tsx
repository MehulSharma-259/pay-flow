/** @format */
import InputBox from "./InputBox";
import User from "./User";

export default function Users() {
  return (
    <>
      <div className="mt-8">
        <InputBox
          label="Users"
          placeholder="Search Users..."
          onChange={() => {}}
        />
      </div>

      <User username="Sajal Sharma" buttonReq={true} onChange={() => {}}/>
      <User username="Rahul Yadav" buttonReq={true} onChange={() => {}}/>
      <User username="Yash Tiwari" buttonReq={true} onChange={() => {}}/>
      <User username="Shivam Gupta" buttonReq={true} onChange={() => {}}/>
    </>
  );
}
