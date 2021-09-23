import React from 'react';
import './App.css';

import { Route } from 'react-router-dom';

import Start from './components/Start';
import Quiz from './components/Quiz';
import Score from './components/Score';
import Message from './components/Message';
import Ranking from './components/Ranking';
import { db } from './config/firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import dotenv from 'dotenv'
dotenv.config();


function App() {
  React.useEffect(async () => {
    const docRef = doc(db, 'bucket', '7uCgLyl1Qh23BS7DpfR0');
    deleteDoc(docRef);
  }, [])
  
  const [name, setName] = React.useState("스파르타 코딩클럽");
  return (
    <div className="App"
      style={{
        maxwidth: "350px",
        margin: "auto",
      }}
    >
      <Route path="/" exact>
        <Start name={name}/>
      </Route>

      <Route path="/quiz" exact>
        <Quiz/>
      </Route>

      <Route path="/score" exact>
        <Score name={name}/>
      </Route>

      <Route path="/message" exact>
        <Message/>
      </Route>

      <Route path="/ranking" exact>
        <Ranking/>
      </Route>

    </div>
  );
}

export default App;
