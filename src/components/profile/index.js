import PropTypes from'prop-types'
import Header from './header'
import { useReducer,useEffect } from 'react'
import { getUserPhotosByUsername } from '../../services/firebase';
import Photos from './photos';

export default function Profile ({user}){

    const reducer=(state,newState)=>({...state,...newState});
    const initialState={
        profile:{},
        photosCollection:[],
        followerCount:0
    }
const [{profile,photosCollection,followerCount},dispatch]=useReducer(reducer,initialState)

useEffect(()=>{
async function getProfileInfoandPhotos(){
const photos=await getUserPhotosByUsername(user.username)
dispatch({profile:user,photosCollection:photos,followerCount:user.followers.length})
console.log(photos)
}
if(user.username){getProfileInfoandPhotos()}},[user.username])

return <><Header
photosCount={photosCollection?photosCollection.length:0}
profile={profile}
followerCount={followerCount}
setFollowerCount={dispatch}/>
<Photos photos={photosCollection}/>'

</>
}

Profile.propTypes={
    user:PropTypes.shape({
        dateCreated:PropTypes.number.isRequired,
        emailAddress:PropTypes.string.isRequired,
        followers:PropTypes.array.isRequired,
        following:PropTypes.array.isRequired,
        fullName:PropTypes.string.isRequired,
        userId:PropTypes.string.isRequired,
        username:PropTypes.string.isRequired
    }).isRequired
}

