import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FootballDashboard from './components/FootballDashboard'

function App() {
  const [backendData, setBackendData] = useState([{}])
  
    useEffect(() => {
      fetch('http://localhost:5000/api')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          
          setBackendData(data)
        })
    }, [])

  return (
    <>
     <div>
      {typeof backendData.users === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
    <FootballDashboard />
    </>
  )
}

export default App
