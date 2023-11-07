import { Auth0Provider } from '@auth0/auth0-react'
import ReactDOM from 'react-dom/client'
import { auth0Config } from '../auth0-config.js'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain={auth0Config.domain}
  clientId={auth0Config.clientId}
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <App />
</Auth0Provider>
)
