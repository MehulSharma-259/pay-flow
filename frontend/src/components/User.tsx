import Button from "./Button";

export default function User({username, buttonReq = true, onChange} : {username: string, buttonReq: Boolean, onChange: () => void}) {

  const getInitials = (username: string) => {
    const parts = username.split(' ').filter(Boolean);

    const n = parts.length;

    if(n === 1)
      return parts[0][0];

    return (parts[0][0] + parts[n - 1][0]).toUpperCase();
  }

  return (
    <>
      <div className="flex justify-between my-5">
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center rounded-full bg-gray-400 h-10 w-10 p-2 ">
            {getInitials(username)}
          </div>
          <div>{username}</div>
        </div>
        { buttonReq && <Button label="Send Money" onChange={onChange} /> }
      </div>
    </>
  )
}