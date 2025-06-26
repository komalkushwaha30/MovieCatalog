import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter } from "react-router"
import {ColorProvider} from './context/colorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ColorProvider>
  </StrictMode>,
)
