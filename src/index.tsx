import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './components/App'
import HomePage from './pages/Home'
import SetupPage from './pages/Setup'
import reportWebVitals from './reportWebVitals'
import './styles/tailwind-build.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Route path='/' exact component={HomePage} />
        <Route path='/setup' component={SetupPage} />
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
