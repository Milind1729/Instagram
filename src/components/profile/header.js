import { useState,useEffect } from "react";
import PropTypes from 'prop-types'
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import {isUserFollowingProfile} from '../../services/firebase'
import { toggleFollow } from "../../services/firebase";
export default function Header({photosCount,
    profile:{docId:profileDocId,userId:profileUserId,fullName,following=[],followers=[],username:profileUsername},
    followerCount,
    setFollowerCount})
{
const {user}=useUser();
const [isFollowingProfile,setIsFollowingProfile]=useState(false);
const activeBtnFollow=user.username &&  user.username!=profileUsername;

const handleToggleFollow= async ()=>{
    setIsFollowingProfile((isFollowingProfile)=>!isFollowingProfile)

    setFollowerCount({
        followerCount:isFollowingProfile?followerCount-1:followerCount+1
    })
   await toggleFollow (isFollowingProfile,user.docId,profileDocId,profileUserId,user.userId)
}


useEffect(()=>{
const isLoggedInUserFollowingProfile=async ()=>{
    const isFollowing=await isUserFollowingProfile(user.username,profileUserId)
setIsFollowingProfile(isFollowing)}
if(user.username && profileUserId)
{
    isLoggedInUserFollowingProfile();
}
},[user.username,profileUserId])


return <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
    <div className="container flex justify-center">
        {profileUsername && <img className="rounded-full h-40 w-40 flex " alt={`${profileUsername} profile picture`} src={`/images/avatars/${profileUsername}.jpg`}/>}


    </div>
    <div className="flex items-right justify-center flex-col col-span-2">
        <div className="container flex items-center">
            <p className="text-2xl mr-4">{profileUsername}</p>
            {activeBtnFollow && (
                <button className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8" type="button" onClick={handleToggleFollow}>
                    {isFollowingProfile?'Unfollow':'Follow'}
                </button>
            )

            }


        </div>
        <div className="container flex mt-4">
            {followers==undefined || following==undefined?(<Skeleton count={1} width={677} height={24}/>):<>
            <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
            </p>
            <p className="mr-10">
                <span className="font-bold">{followerCount}</span>{' '}{followerCount===1?'follower':'followers'}

            </p>
            <p className="mr-10">
                <span className="font-bold">{following.length}</span> following
            </p>
            
            </>}
    
    
    </div>
<div className=" container mt-4">
    <p className=" font-medium">{!fullName?<Skeleton count={1} height={24}/>:fullName}</p>
</div>


    </div>
</div>

}
Header.propTypes={
photosCount:PropTypes.number.isRequired,
followerCount:PropTypes.number.isRequired,
setFollowerCount:PropTypes.func.isRequired,
profile:PropTypes.shape({
    docId:PropTypes.string,
    userId:PropTypes.string,
    fullName:PropTypes.string,
    following:PropTypes.array,
    followers:PropTypes.array,
    profileUsername:PropTypes.string
}).isRequired
}