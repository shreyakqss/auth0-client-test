import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import './App.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Login with Auth0</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <button onClick={() => logout()}>Logout</button>;
};

const Profile = () => {
  const { user, isAuthenticated, isLoading,getAccessTokenSilently,getIdTokenClaims } = useAuth0();
  const [accesstoken,setAccessToken] = useState('N/A'); 
  const [idtoken,setIdToken] = useState('N/A'); 
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  getAccessTokenSilently().then((token) => {
    setAccessToken(token)
    getIdTokenClaims().then((claims) => {
      setIdToken(claims.__raw)
    })
  })

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>ID Token (JWT): 
          <div className='tokendiv'>{idtoken}</div>
        </p>
        <p>Access Token (JWT): 
          <div className='tokendiv'>{accesstoken}</div>
        </p>
        <p><LogoutButton /></p>
      </div>
    )
  );
};


function App() {
  const { isAuthenticated,isLoading } = useAuth0();

  return (
    <>
      <div>
        {
          !isAuthenticated && !isLoading && (
            <LoginButton />
          )
        }
        <Profile />
      </div>
    </>
  )
}

export default App
