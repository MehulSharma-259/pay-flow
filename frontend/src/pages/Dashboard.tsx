/** @format */

import Balance from "../components/Balance";
import Navbar from "../components/Navbar";
import Users from "../components/Users";

export default function Dashboard() {
  return (
    <>
      <Navbar/>
      <div className="m-8">
        <Balance/>
        <Users/>
      </div>
    </>
  );
}
