import React from 'react';

import nabe from './images/nabe.jpg'
import './App.css';
import Button from './components/atoms/Button';


function App() {
  return (
    <div className='App'>
      <div className="AppName">煮たりないタスク</div>
      <div>
        <img className="NabeImg" src={nabe} alt="nabe" />
      </div>
          <Button>追加</Button>
    </div>
  );
}

export default App;
