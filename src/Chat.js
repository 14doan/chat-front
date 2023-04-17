import { SearchOutlined } from '@mui/icons-material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import axios from './axiosIn';
import './Chat.css';

function Chat({ msgs, rooms }) {
  const [input, setInput] = useState('');
  // const { roomId } = useParams();
  const [postURl, setPost] = useState('');

  useEffect(() => {
    if (rooms?.name === 'thaicos') {
      setPost('/thairoom/new');
    } else {
      setPost('/vietroom/new');
    }
  }, [rooms?.name]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const time = new Date().getTime();
    const formattedTime = new Date(time).toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    const buttonName = e.target.id;
    const received = buttonName === 'answer' ? true : false;
    const nameValue = received ? 'answer' : 'question';

    await axios.post(postURl, {
      name: nameValue,
      message: input,
      timestamp: formattedTime,
      received: received,
    });

    setInput('');
  };
  //get rid of enter=submit default for button in form
  const handleFormKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h2>{rooms?.name === 'thaicos' ? 'Thai Room' : 'Viet Room'}</h2>
          <p> Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {msgs?.map((message, index) => (
          <p
            key={index}
            className={`chat__message ${!message.received && 'chat__receive'}`}
          >
            <span className="message__name">{message.name}</span>
            {message.message}
            <span className="message__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <EmojiEmotionsOutlinedIcon />
        <form onKeyDown={handleFormKeyDown}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="write message here"
          />
          <IconButton onClick={sendMessage}>
            <div
              className="button chat__footer__btnLeft"
              type="submit"
              id="answer"
            >
              Answer
            </div>
          </IconButton>
          <IconButton onClick={sendMessage}>
            <div
              className="button chat__footer__btnRight"
              type="submit"
              id="ask"
            >
              Ask
            </div>
          </IconButton>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default Chat;
