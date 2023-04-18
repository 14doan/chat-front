import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import axios from './axiosIn';

function App() {
  const [thaiM, setThai] = useState();
  const [rooms, setRooms] = useState([]);
  const [vietM, setViet] = useState();

  useEffect(() => {
    axios.get('/collections').then((response) => {
      // console.log('response is an object ', response);
      setRooms(
        response.data.map((item) => ({ id: item.info.uuid, name: item.name }))
      );
    });
  }, []);
  // console.log('rooms are: ', rooms);

  useEffect(() => {
    axios.get('/thaimessages/sync').then((response) => {
      // console.log('reponse is:', response);
      setThai(response.data);
    });
    axios.get('/vietmessages/sync').then((response) => {
      // console.log('reponse is:', response);
      setViet(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('78ff701f11668f966776', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('thaicos');
    channel.bind('inserted', (newM) => {
      // alert(JSON.stringify(data));
      setThai([...thaiM, newM]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [thaiM]);

  useEffect(() => {
    const pusher = new Pusher('78ff701f11668f966776', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('vietcos');
    channel.bind('inserted', (newM) => {
      // alert(JSON.stringify(data));
      setViet([...vietM, newM]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [vietM]);

  // console.log('these are thaiM: ', thaiM);

  return (
    <div className="app">
      <div className="app__body">
        <Router>
          <Sidebar rooms={rooms} />
          <Routes>
            <Route path="/" element={<Chat msgs={thaiM} rooms={rooms[0]} />} />
            <Route
              path={`/roomid/${rooms[0]?.id}`}
              element={<Chat msgs={thaiM} rooms={rooms[0]} />}
            />
            <Route
              path={`/roomid/${rooms[1]?.id}`}
              element={<Chat msgs={vietM} rooms={rooms[1]} />}
            />
            {/* <Route
            path="/rooms/:roomId" 
            element={<Chat msgs={thaiM} rooms={rooms} />}
          /> */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
