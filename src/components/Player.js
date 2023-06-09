import React, { useEffect} from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from'./Player.css'
import {Wave} from "@foobar404/wave";
import db from './../firebase-config';

import {useState} from "react";

const Player = () => {
    const [allTracks, setUsers] = useState([]);
    /* Fetch ------------------------------------------- */
    useEffect(() => {
        db.collection('tracks').orderBy('datetime', 'desc').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    title: doc.data().title,
                    author:doc.data().author,
                    image: doc.data().images,
                    audio:doc.data().audio,
                    datetime: doc.data().datetime,
                }
            }))
        })
    }, []);
    //////////////////////

    function useHome() {
        let canvasElm = document.querySelector(".canvasElmId")
        let audioElm = document.querySelector("audio");
        let [wave, setWave] = useState(null);
        let [activeAnimation, setActiveAnimation] = useState(0);

        useEffect(() => {
            if (!canvasElm) return;
            if (!audioElm) return;
            if (wave) return;
            //canvasElm.width = window.innerWidth * 0.7;
            //canvasElm.height = window.innerHeight * 0.5;
            setWave(new Wave(audioElm, canvasElm));
        }, [audioElm]);

        useEffect(() => {
            if (!wave) return;
            setPreset(0);
        }, [wave]);


        function setPreset(preset) {
            wave?.clearAnimations();

            if (preset === 1) {
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "#64C8FF",
                    mirroredX: true,
                    count: 32,
                    rounded: true,
                    frequencyBand: "base"
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "#0039A6",
                    mirroredX: true,
                    count: 60,
                    rounded: true
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor:"#F00000",
                    mirroredX: true,
                    count: 25,
                    rounded: true,
                    frequencyBand: "highs"
                }));
            }
            if (preset === 0) {
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "black",
                    mirroredX: true,
                    count: 32,
                    rounded: true,
                    frequencyBand: "base"
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "#0e3fd1",
                    mirroredX: true,
                    count: 60,
                    rounded: true
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor:"#dc1f26",
                    mirroredX: true,
                    count: 25,
                    rounded: true,
                    frequencyBand: "highs"
                }));
            }
            if (preset === 2) {
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "#FFFFFF",
                    mirroredX: true,
                    count: 32,
                    rounded: true,
                    frequencyBand: "base"
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "#0039A6",
                    mirroredX: true,
                    count: 60,
                    rounded: true
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor:"#D52B1E",
                    mirroredX: true,
                    count: 25,
                    rounded: true,
                    frequencyBand: "highs"
                }));
            }

            if (preset === 3) {
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "#FFFFFF",
                    mirroredX: true,
                    count: 32,
                    rounded: true,
                    frequencyBand: "base"
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "#FF0000",
                    mirroredX: true,
                    count: 60,
                    rounded: true
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor:"#FFDF00",
                    mirroredX: true,
                    count: 25,
                    rounded: true,
                    frequencyBand: "highs"
                }));
            }
            if (preset === 4) {
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "#de0000",
                    mirroredX: true,
                    count: 32,
                    rounded: true,
                    frequencyBand: "base"
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor: "#068e6b",
                    mirroredX: true,
                    count: 60,
                    rounded: true
                }));
                wave?.addAnimation(new wave.animations.Wave({
                    lineColor: "white",
                    lineWidth: 10,
                    fillColor:"#de0000",
                    mirroredX: true,
                    count: 25,
                    rounded: true,
                    frequencyBand: "highs"
                }));
            }
        }

        return {
            audioElm,
            canvasElm,
            setPreset,
            setActiveAnimation,
            activeAnimation,
            wave,
        }
    }

const [thisTrack,setTrack]=useState("");
//Media.onClickNext(console.log("next"))
const getTrack=(napr)=>{
    let thiss=allTracks.indexOf(allTracks.find(x=>x.audio===thisTrack))
    if(thiss<allTracks.length-1 && napr==="next"){
        setTrack((allTracks[thiss+1]).audio)
    }else if(thiss>0 && napr==="prev"){
        setTrack((allTracks[thiss-1]).audio)
    }
}

////////////////////////
    const  data=useHome()
    return (
        <div className={"player-block"} >

            <div className={"visualisation"} >
                <p>{thisTrack.firstChild}</p>
                <canvas className="canvasElmId" width={window.innerWidth *0.7} height={window.innerHeight * 0.5}></canvas>
                <div className={"setAnimation"}>
                    <div className={`setAnimationItem ${data.activeAnimation === 0 ? '--active' : ''}`}
                         onClick={() => {
                             data.setPreset(0);
                             data.setActiveAnimation(0);
                         }}>ДНР</div>
                    <div className={`setAnimationItem ${data.activeAnimation === 1 ? '--active' : ''}`}
                         onClick={() => {
                             data.setPreset(1);
                             data.setActiveAnimation(1);
                         }}>ЛНР</div>
                    <div className={`setAnimationItem ${data.activeAnimation === 2 ? '--active' : ''}`}
                         onClick={() => {
                             data.setPreset(2);
                             data.setActiveAnimation(2);
                         }}>РФ</div>
                    <div className={`setAnimationItem ${data.activeAnimation === 3 ? '--active' : ''}`}
                         onClick={() => {
                             data.setPreset(3);
                             data.setActiveAnimation(3);
                         }}>Южная Осетия</div>
                    <div className={`setAnimationItem ${data.activeAnimation === 4 ? '--active' : ''}`}
                         onClick={() => {
                             data.setPreset(4);
                             data.setActiveAnimation(4);
                         }}>Приднестровье</div>
                    
                </div>
            </div>
            <div className={"player player-list"}>
                <AudioPlayer className={"audioElmId"} autoPlay showJumpControls={false} showSkipControls={true} showFilledVolume={false}
                    autoPlayAfterSrcChange volume={0.5} crossOrigin = "anonymous"
                    src={thisTrack} onClickNext={e => getTrack("next")} onClickPrevious={e => getTrack("prev")}
                    //src={'./../test_base/Лето и арбалеты.mp3'}
                />
                <div className={"player-tracks"}>
                    {allTracks.map((items,index) => (
                        <div key={items.id}  >
                            <div id={items.audio} className={"track"}
                                style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                flexDirection: "row",
                                marginTop:30,
                                borderRadius:10,
                                background:"#f57d7d",
                                padding:3,}} >
                                <div style={{paddingRight:20}}>
                                    <img onClick={e=>(setTrack((e.target.parentElement.parentElement.id)))} style={{width:"auto"   ,height:90,borderRadius:10,cursor:"pointer"}} src={items.image} alt=""/>
                                </div>
                                <div className={"track-text"} >
                                <p style={{fontSize:24,}} className={"track-name"}>{items.title}</p>
                                <p style={{fontSize:24,color:"#4c4a4a"}}className={"track-author"}>{items.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Player;