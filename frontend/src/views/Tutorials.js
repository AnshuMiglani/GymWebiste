import {React,useEffect,useState} from 'react';
import Navbar from './Navbar.js';
import Muscular from './Muscular.js';
import './fit-maker-website.css';
import "./BodyMap.css";
import axios from 'axios';
import LoginPromptModal from './LoginPromptModal.js';
import "./LoginPromptModal.css";


const Tutorials=()=>{
    const [showModal,setshowModal]= useState(false);
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth-status`,{withCredentials:true})
      .then((res) => {
        if(res.data.Ispresent){
            setshowModal(false);
        }
        else{
            setshowModal(true);
        }
      })
      .catch(()=>{setshowModal(true)});
    },[]);


    return(
        <div className="fit-maker-website-container">
        <div className="fit-maker-login-page-navbar">
        <Navbar presentab="Tutorials"/>
        </div>
        <div className='Muscularbodyparts'>
        <Muscular present="yes"/>
        </div>

        {showModal && <LoginPromptModal onClose={() => setshowModal(false)} />}
        </div>
    );
};
export default Tutorials;