import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "App"
import { loadModel } from "logic/cnn"

const main = async () => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  )
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  await loadModel()
}

main()
