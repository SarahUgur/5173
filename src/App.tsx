import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧹 Privat Rengøring</h1>
        <p>Social platform for rengøringsservices i Danmark</p>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Klik her: {count}
          </button>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
          <h2>🎉 Det virker!</h2>
          <p>Dette er starten på din rengørings-app!</p>
        </div>
      </header>
    </div>
  );
}

export default App;