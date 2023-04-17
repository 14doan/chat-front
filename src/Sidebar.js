import { SearchOutlined } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import axios from './axiosIn';
import './Sidebar.css';
import SidebarChat from './SidebarChat';

function Sidebar({ rooms }) {
  // const [rooms, setRooms] = useState([]);

  // useEffect(() => {
  //   axios.get('/collections').then((response) => {
  //     // console.log('response is an object ', response);
  //     setRooms(
  //       response.data.map((item) => ({ id: item.info.uuid, name: item.name }))
  //     );
  //   });
  // }, []);
  // console.log('rooms are: ', rooms);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerLeft">
          <Avatar src="/journal.png" />
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <AccountBoxIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="search or new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
