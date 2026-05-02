import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

document.body.style.margin = '0';
document.body.style.background = 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)';
document.body.style.backgroundAttachment = 'fixed';
document.body.style.minHeight = '100vh';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)