import './App.css';
import Modal from "./components/Modal";
import {useState} from "react";
import Player from "./components/Player";

function App() {
    const [modalActive, setModalActive]=useState()
  return (
    <div className="App">
        <div className={"support"}>
        <div className={"support-block"}>
            <img src={require("./files/img/DPR.png")} alt={""}/>
            <img src={require("./files/img/LPR.png")} alt={""}/>
            <p>Поддержите жителей Донбасса</p>
        </div>
        </div>
        <header className="App-header">
            <img src={require("./files/img/lenin.svg").default} alt={""}/>
            <h1>Совет Тюнс</h1>
      </header>
        <div className={"container"}>
            <button onClick={()=>{setModalActive(true)}} className={"c-button"}>Загрузить Трек</button>
        </div>
        <Modal active={modalActive} setActive={setModalActive}/>
        <Player></Player>
    </div>

  );
}

export default App;
