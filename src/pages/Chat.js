import React from "react";
import { useState } from "react";
import "../styles/Chat.css"
function Chat (props) {
    const [currentTab, setCurrentTab] = useState(-1);
    const [new_msg, setNewMsg] = useState('');
    const data = [
          { id: "1", name: "Thợ sửa 1"}
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
      
    const [messenger, setMessenger] = useState([{"sender": "Staff", "content": "Đây là tin nhắn từ nhân viên sửa chữa_1", "image":"null"},
    {"sender": "Customer", "content": "Đây là tin nhắn từ khách hàng_2","image":"null"},
    {"sender": "Staff", "content": "Đây là tin nhắn từ nhân viên sửa chữa_3","image":"null" },
    {"sender": "Customer", "content": "Đây là tin nhắn từ khách hàng_4", "image":"null"},
    {"sender": "Staff", "content": "Đây là tin nhắn từ nhân viên sửa chữa_3","image":"null" },
    {"sender": "Customer", "content": "Đây là tin nhắn từ khách hàng_4","image":"null" }
    ]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        setMessenger([...messenger, {"sender": "Customer", "content": e.target[1].value}]);
        setNewMsg('');
    }
    const generateElementMessage = () => {
        const item = [];
        for (let i = 0; i < messenger.length; i++){
            if (messenger[i].sender === "Staff") item.push(
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