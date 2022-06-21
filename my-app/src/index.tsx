import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";




ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="YOU_SERVER_URL" appId="YOUR_APP_ID">
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
