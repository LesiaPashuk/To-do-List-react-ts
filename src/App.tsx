import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CreateToDoLists from './components/CreateToDoLists/CreateToDoLists';
import { useState } from 'react';
 export type typeForButtonNav="TaskToDoList"|"Сalendar"|"Habit"|"Matrix"|"Timer";
 function App() {
 const [buttonStatusForNav, setButtonStatusForNav]=useState<typeForButtonNav>("TaskToDoList")
  return (<div className="App">
    <nav>
    <ul id="navbar" className="d-flex align-items-start flex-column mb-3">
  <li><button onClick={()=>{ setButtonStatusForNav("TaskToDoList")}}>1</button></li>
  <li><button onClick={()=>{ setButtonStatusForNav("Сalendar")}}>2</button></li>
  <li><button onClick={()=>{ setButtonStatusForNav("Habit")}}>3</button></li>
  <li><button onClick={()=>{ setButtonStatusForNav("Matrix")}}>4</button></li>
  <li><button onClick={()=>{ setButtonStatusForNav("Timer")}}>5</button></li>
</ul>
    </nav>
    <div>
      {buttonStatusForNav==="TaskToDoList"?
      (<CreateToDoLists></CreateToDoLists>):
      buttonStatusForNav==="Сalendar"?(<h2>Сalendar</h2>):
      buttonStatusForNav==="Habit"?(<h2>Habit</h2>):
      buttonStatusForNav==="Matrix"?(<h2>Matrix</h2>):
      (<h2>Timer</h2>)
      }
    </div>
  </div>);
}

export default App;