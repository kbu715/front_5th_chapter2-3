import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router basename={import.meta.env.VITE_BASE_PATH}>
      <App />
    </Router>
  </React.StrictMode>,
)
