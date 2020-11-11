import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './components/App'
import HomePage from './pages/Home'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Route path='/' exact component={HomePage} />
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
