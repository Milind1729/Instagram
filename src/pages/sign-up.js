import { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import FirebaseContext from "../context/firebase"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import * as ROUTES from '../constants/routes'
import { doesUserNameExist } from "../services/firebase";
export default function SignUp() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [username, setusername] = useState('');
    const [fullName, setfullName] = useState('');
    const [emailAddress, setemailaddress] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignup = async (event) => { 

        event.preventDefault();
const usernameExists = await doesUserNameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);


        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // firebase user collection (create a document)
        await firebase
          .firestore()
          .collection('users')
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: ['2'],
            followers: [],
            dateCreated: Date.now()
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setfullName('');
        setemailaddress('');
        setpassword('');
        seterror(error.message);
      }
    } else {
      setusername('');
      seterror('That username is already taken, please try another.');
    }
    //    try{
        
    //    }catch(error){
        
    //    }

    };

    useEffect(() => {
        document.title = 'Sign Up-Instagram';
    })

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="Iphone with Instagram" />

            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white rounded p-4 border border-gray-primary mb-4">
                    <hi className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Insta" className="mt-2 w-6/12 mb-4" />
                    </hi>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                    <form onSubmit= {handleSignup} method="POST">
                    <input
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setusername(target.value)}
value={username}
                        />
                         <input
                            aria-label="Enter your fullName"
                            type="text"
                            placeholder="Full Name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setfullName(target.value)}
                            value={fullName}
                        />
                        <input
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email Address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setemailaddress(target.value)}
                            value={emailAddress}
                        />
                        <input
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setpassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`} >Sign in</button>
                    </form>

                    

                </div>
                <div
                        className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                        <p className="text-sm">Have an account?{' '}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">Log In</Link></p>
                    </div>
            </div>
        </div>


    );

}