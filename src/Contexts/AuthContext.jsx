import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//Create a new context object called AuthContext using create Context hook.
//Pass an empty object as the inital value of the context.
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //sets the user information when logged in.
  const [user, setUser] = useState('');
  //Sets failed auth to let user know if invalid username or password was input.
  const [failedAuth, setFailedAuth] = useState(false);
  const [success, setSuccess] = useState(false);

  //Gets authToken from seesion storage.
  const authToken = sessionStorage.getItem('authToken');

  // if there is no auth token in session storage auth is failed
  useEffect(() => {
    if (!authToken) {
      setFailedAuth(true);
    }
  }, [authToken]);

  //get jwt from server side
  useEffect(() => {
    
    if (authToken) {
      axios
        .get('http://localhost:8000/user/profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setFailedAuth(false);
          setSuccess(true);
        })
        .catch(() => {
          setUser('');
          setFailedAuth(true);
          setSuccess(false);
        });
    } else {
      setUser('');
      setFailedAuth(false);
      setSuccess(false);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      failedAuth,
      setFailedAuth,
      success,
      setSuccess,
    }}>

      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;