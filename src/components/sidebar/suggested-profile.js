import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {updateLoggedInUserFollowing,updateFollowedUserFollowers} from "../../services/firebase"
export default function SuggestedProfile({ profileDocId, username, profileId, userId,loggedInUserDocId }) {
    const [followed, setFollowed] = useState(false);
async function handleFollowUser()
{setFollowed(true);

await updateLoggedInUserFollowing(loggedInUserDocId,profileId,false);

await updateFollowedUserFollowers(profileDocId,userId,false);

}


    return !followed ? (<div className='flex flex-row intems-center align-items justify-between'>
        <div className='flex items-center justify-between'>
            <img className='rounded-full w-8 flex mr-3'
                src={`/images/avatars/${username}.jpg`} alt="" />
            <Link to={`/p/${username}`}>
                <p className='font-bold text-sm'>{username}</p>
            </Link>
        </div>
        <button className='text-xs font-bold text-blue-medium' type='button'
            onClick={handleFollowUser}>
            Follow
        </button>
    </div>) : null


}

SuggestedProfile.prototype = {
    UserDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
}