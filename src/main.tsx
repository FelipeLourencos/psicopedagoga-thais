import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { conteudo } from './conteudo.ts'

// Paleta do tema, definida em conteudo.ts
const { cores } = conteudo
const raiz = document.documentElement.style
raiz.setProperty('--papel', cores.fundo)
raiz.setProperty('--papel-lilas', cores.fundoLilas)
raiz.setProperty('--papel-piscina', cores.fundoPiscina)
raiz.setProperty('--tinta', cores.tinta)
raiz.setProperty('--tinta-suave', cores.tintaSuave)
raiz.setProperty('--lilas', cores.principal)
raiz.setProperty('--lilas-forte', cores.principalForte)
raiz.setProperty('--piscina', cores.apoio)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
