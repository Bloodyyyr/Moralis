import React,{StrictMode} from 'react';  
import { render } from 'react-dom'

import App from './App.tsx';
// import "./styles/Main.css"

import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";

const serverUrl='YOU_SERVER_URL'
const appId = "YOUR_APP_ID";

render(
  <StrictMode>
     <MoralisProvider serverUrl={serverUrl} appId={appId} >
       <App/>
     </MoralisProvider>
  </StrictMode>,
  document.getElementById('root')
  ,
)

reportWebVitals();