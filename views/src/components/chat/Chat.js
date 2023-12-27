import React from "react";
import { useState, useEffect, useRef} from "react";
import "../chat/chat.css"
import axios from 'axios'
import Cookies from "universal-cookie";
import {useParams} from 'react-router-dom';
import firebase from 'firebase/compat/app';
//import "firebase/compat/database";
import 'firebase/compat/auth'; 

const cookies = new Cookies();

function Chat () {
    var firebaseConfig = {
        apiKey: "AIzaSyAtdvO_pMVPMCeqQu2jBTGnUOQVdyhcAzk",
        authDomain: "chat-test-d7bdc.firebaseapp.com",
        databaseURL: "https://chat-test-d7bdc-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "chat-test-d7bdc",
        storageBucket: "chat-test-d7bdc.appspot.com",
        messagingSenderId: "1089045181810",
        appId: "1:1089045181810:web:265ec61f15dd4ffb0dd9eb"
      };
    firebase.initializeApp(firebaseConfig);
    var db = firebase.database();
    const [currentTab, setCurrentTab] = useState(-1);
    const [new_msg, setNewMsg] = useState('');
    const [role, setRole] = useState();
    const token = cookies.get("TOKEN");
    const user_name = cookies.get("USER_NAME");
    const nameOpposite = useParams();
    useEffect(() => {
      const token = cookies.get("TOKEN");
      console.log(user_name)
      if (!token) {
      }
      else {
        axios.post("/api/signin/role", { user_name })
        .then((response) => {
          setRole(response.data.role);
          console.log(response.data.role);
        }).catch((error) => {
          console.log(error);
        })
      }
    }, [])
    const data = [
          { id: "1", name: nameOpposite.name}
        ];
    const handleClick = (currentTab) => {
       setCurrentTab(currentTab);
    }
    const handleChange = (e) => {
        setNewMsg(e.target.value);
     }

    const resizeImage = (file, maxWidth, maxHeight, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
      
        reader.onload = function (event) {
          const img = new Image();
          img.src = event.target.result;
      
          img.onload = function () {
            let width = img.width;
            let height = img.height;
      
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }
      
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
      
            ctx.drawImage(img, 0, 0, width, height);
      
            canvas.toBlob((blob) => {
              callback(blob);
            }, file.type);
          }
        }
    }
      
    const [messenger, setMessenger] = useState([]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        //setMessenger([...messenger, {"sender": role, "content": e.target[1].value}]);
        setNewMsg('');
        const timestamp = Date.now();
        var message = e.target[1].value;
        db.ref("messages/" + timestamp).set({
          role,
          message,
        });
    }
    const initialized = useRef(false);
    const fetchChat = db.ref("messages/");
    // check for new messages using the onChildAdded event listener
    useEffect(() =>{
      if (!initialized.current){
      initialized.current = true;
      fetchChat.on("child_added", function (snapshot) {
      const messages = snapshot.val();
      setMessenger(prevMessages => [
        ...prevMessages,
        {"sender": messages.role, "content": messages.message}
      ]);
      })}
    }, []);

    const generateElementMessage = () => {
        const item = [];
        for (let i = 0; i < messenger.length; i++){
            if (messenger[i].sender !== role) item.push(
            <div className="left-msg">
                <div className="msg-bubble">
                    <div className="msg-info">
                        <div className="msg-info-time">12:45</div>
                    </div>
                    <div className="msg-text">{messenger[i].content}</div>
                </div>
            </div>)
            else item.push(
                <div className="right-msg">
                <div className="msg-bubble">
                    <div className="msg-info">
                        <div className="msg-info-time">12:45</div>
                    </div>
                    <div className="msg-text">{messenger[i].content}</div>

                </div>
            </div>
            )
        }
        return item;
    }
    return(
    <div className="background">   
    <div className="chat">
        <div className="tab">
        {data.map((button, i) => (
          <button key={button.name} type="button" className="tablinks" onClick={() => handleClick(i)}>
            <span className="icon"></span>{button.name}</button>
          )
          )
        }
        </div>
      
        <div className="tabcontent">
          {currentTab !== -1 &&
            <React.Fragment>
              <div className="msg-frame">
                <div className="msg">
                    {generateElementMessage()}
                </div>
                
                <form className="msg-input-area" onSubmit={handleSubmit}>
                <input type ="file" id="acutual-btn" hidden></input>
                <label for="acutual-btn"> <span className="icon-img"></span></label>
                <input type="text" className="msg-input" placeholder="Nhập tin nhắn tại đây" value = {new_msg} onChange={handleChange}></input>
                <button type="submit" className="msger-send-btn">GỬI</button>
                </form>
              </div>
              <form>
              </form>
            </React.Fragment>
          }
        </div>
    </div>
    </div>
        )
        
}
export default Chat;