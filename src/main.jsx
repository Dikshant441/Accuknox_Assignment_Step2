import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { appStore } from './store/appStore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provide store to App */}
    <Provider store={appStore}>
      <App />
    </Provider>
    
  </StrictMode>,
)
