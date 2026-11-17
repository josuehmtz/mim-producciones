import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fuentes auto-alojadas (sin peticiones a terceros: mejor privacidad y rendimiento)
import '@fontsource-variable/sora/index.css'
import '@fontsource-variable/inter/index.css'

import './styles/global.css'
import App from './App'

const root = document.getElementById('root')
if (!root) throw new Error('No se encontró el elemento #root')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
