import React from 'react';
import db from './../firebase-config';
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useState} from "react";
const Modal = ({active,setActive}) => {
    const [userInfo, setuserInfo] = useState({
        title: '',
        author:'',
    });
    const onChangeValue = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
    }

    const [isUsers, setUsers] = useState([]);

//----------------------------------------------------------
    const [isfile, setFile] = useState(null);
    const handleImageAsFile = (e) => {
        setFile(e.target.files[0]);
    }
    const [isfileA, setFileA] = useState(null);
    const handleAudioAsFile=(e)=>{
        setFileA(e.target.files[0])
    }

    /* Insert ------------------------------------------- */
    const addlist = async(event) => {
        try {
            event.preventDefault();
            let file = isfile;
            let fileA=isfileA;
            const storage = getStorage();
            var storagePath = 'uploads/images/' + file.name;
            var storagePathA='uploads/audio/'+fileA.name;
            const storageRef = ref(storage, storagePath);
            const storageRefA=ref(storage,storagePathA);
            const uploadTask = uploadBytesResumable(storageRef, file);
            const uploadTaskA=uploadBytesResumable(storageRefA,fileA)

            uploadTask.on('state_changed', (snapshot) => {
                    // progress function ....
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    // error function ....
                    console.log(error);
                },
                () => {
                    // complete function ....
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        getDownloadURL(uploadTaskA.snapshot.ref).then((downloadURLA)=>{
                            console.log('File available at', downloadURL);
                            db.collection('tracks').add({
                                title: userInfo.title,
                                images: downloadURL,
                                audio:downloadURLA,
                                author:userInfo.author,
                                datetime: firebase.firestore.FieldValue.serverTimestamp()
                            })
                            setuserInfo({
                                ...userInfo,
                                title:'',
                                author:'',
                            });
                            setFile(null);
                            setFileA(null)
                        })
                    });
                });
        } catch (error) { throw error;}
    }


    return (
        <div className={active ? "modal active":"modal"} onClick={()=>setActive(false)  }>
            <div className={"modal-content"} onClick={e=>e.stopPropagation()}>
                <h1 style={{fontSize:24,textAlign:"center"}}>Загрузка трека</h1>
                <div className="wrapper">
                    {/* Insert users -------------------------------------------*/}
                    <form onSubmit={addlist}>
                        <div className={"upload-main-block"}>
                        <div className={"upload-block"}> <input type="text" id="title"  name="title" value={userInfo.title} onChange={onChangeValue} placeholder=" Название трека " required /></div>
                        <div className={"upload-block"}> <input type="text" id="title"  name="author" value={userInfo.author} onChange={onChangeValue} placeholder=" Исполнитель " required /></div>
                        <div className={"upload-block"}> <p>Обложка трека </p><input type="file" accept="image/*" onChange={handleImageAsFile}/></div>
                        <div className={"upload-block"}> <p>Трек </p><input type="file" accept="audio/*" onChange={handleAudioAsFile}/></div>
                        <div className={"upload-block"}> <button type="submit" className="btn__default btn__add" > Загрузить </button></div>
                        </div>
                    </form>
                </div>
                </div>
            <style jsx={"true"}>
                {`
                  .modal {
                    height: 100vh;
                    width: 100%;
                    background-color: rgba(0, 0, 0, 0.4);
                    position: fixed;
                    top: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    pointer-events: none;
                    transition: .5s;
                    z-index:999;
                  }

                  .modal.active {
                    opacity: 1;
                    pointer-events: all;
                  }

                  .modal-content {
                    padding: 20px;
                    border-radius: 12px;
                    background-color: #55eac3;
                    width: 50%;
                    height: 40%;
                  }

                  @media (max-width: 600px) {
                    .modal-content {
                      width: 80%;
                      height: 50%;
                    }
                  }
                  .upload-main-block{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                  }
                  .upload-block{
                    margin:10px auto;
                    font-size: 20px;
                  }

                `}
            </style>
        </div>
    );
};

export default Modal;