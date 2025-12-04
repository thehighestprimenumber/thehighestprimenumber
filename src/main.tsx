import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import App from './App'
import { theme } from './theme'
import './index.css'

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaSiteKey}
      language="en"
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
)

