import { useState } from 'react'
import Header from './components/Header'
import Login from './components/Login'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <div className="App">
      <Header onLogin={() => setShowLogin(!showLogin)} />
      {showLogin && <Login />}
    </div>
  );
}

export default App;
