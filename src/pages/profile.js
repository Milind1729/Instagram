import {userParams, userHistory} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import * as ROUTES from '../constants/routes'
import {getUserByUsername} from '../services/firebase'
import Header from '../components/header'
import UserProfile from "../components/profile"

export default function Profile()
{
const {username}=useParams();
const [user,setUser]=useState(null);
const [userExists,setUserExists]=useState(false);
const history =useHistory()
useEffect(()=>{
async function checkUserExists(){
    const user=await getUserByUsername(username);
    if(user.length>0)
    {setUserExists(true)
        setUser(user[0]);
    }
    else{
        
        history.push(ROUTES.NOT_FOUND)
    }
    
}
checkUserExists();

},[history,username])
return userExists?(<div className='bg-gray-background'><Header/>
    <div className='mx-auto max-w-screen-lg'><UserProfile user={user}/></div>
</div>):null

}