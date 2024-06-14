import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import ContextProvider from "./context/MyContext.jsx"
import PlayersContextProvider from './context/PlayersContext.jsx';
import SocketContext from './context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <PlayersContextProvider>
        <SocketContext>
          <App />
        </SocketContext>
      </PlayersContextProvider>
    </ContextProvider>
  </React.StrictMode>,
)
