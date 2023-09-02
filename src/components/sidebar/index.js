import useUser from "../../hooks/use-user"
import User from "./user";
import Suggestions from "./suggestions";
export default function Sidebar ()
{ const {user:{docId,fullName,username,userId,following}}=useUser();
console.log('fullname',fullName)
    return (<div className="p-4">
        <User username={username} fullName={fullName}/>
        <Suggestions loggedInUserDocId={docId} userId={userId} following={following}/>
    </div>);
}
