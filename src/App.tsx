// React
import React from 'react';
import { useEffect } from "react";

import './App.css';
import { useMoralis } from "react-moralis";

// React router
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import RedirectTo from "./components/RedirectTo";



function App() {

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  useEffect(() => {
  if (isAuthenticated) {
    // add your logic here
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

return (
  <div>
    <h1>Moralis Hello World!</h1>
    <button onClick={login}>Moralis Metamask Login</button>
    <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
  </div>
);
}

export default App;