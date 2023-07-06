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
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   axios.get('/collections').then((response) => {
  //     // console.log('response is an object ', response);
  //     setRooms(
  //       response.data.map((item) => ({ id: item.info.uuid, name: item.name }))
  //     );
  //   });

  //   axios.get('/thaimessages/sync').then((response) => {
  //     // console.log('reponse is:', response);
  //     setThai(response.data);
  //   });
  //   axios.get('/vietmessages/sync').then((response) => {
  //     // console.log('reponse is:', response);
  //     setViet(response.data);
  //   });
  // }, []);
  useEffect(() => {
    // Fetch data here

    Promise.all([
      axios.get('/collections'),
      axios.get('/thaimessages/sync'),
      axios.get('/vietmessages/sync'),
    ])
      .then((responses) => {
        const [
          collectionsResponse,
          thaiMessagesResponse,
          vietMessagesResponse,
        ] = responses;

        setRooms(
          collectionsResponse.data.map((item) => ({
            id: item.info.uuid,
            name: item.name,
          }))
        );
        setThai(thaiMessagesResponse.data);
        setViet(vietMessagesResponse.data);
        setIsLoading(false); // Set loading state to false once all data is fetched
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        setIsLoading(false); // Set loading state to false even if there's an error
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

    const pusher2 = new Pusher('78ff701f11668f966776', {
      cluster: 'eu',
    });

    const channel2 = pusher2.subscribe('vietcos');
    channel2.bind('inserted', (newM) => {
      // alert(JSON.stringify(data));
      setViet([...vietM, newM]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      channel2.unbind_all();
      channel2.unsubscribe();
    };
  }, [thaiM, vietM]);

  return (
    <div className="app">
      {isLoading ? (
        // Render loading animation here
        <div className="loading-spinner">Loading...</div>
      ) : (
        // Render the app content once data is loaded

        <div className="app__body">
          <Router>
            <Sidebar rooms={rooms} />
            <Routes>
              <Route
                path="/"
                element={<Chat msgs={thaiM} rooms={rooms[0]} />}
              />
              <Route
                path={`/roomid/${rooms[0]?.id}`}
                element={<Chat msgs={thaiM} rooms={rooms[0]} />}
              />
              <Route
                path={`/roomid/${rooms[1]?.id}`}
                element={<Chat msgs={vietM} rooms={rooms[1]} />}
              />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

/* <Route
            path="/rooms/:roomId" 
            element={<Chat msgs={thaiM} rooms={rooms} />}
          /> */

// console.log('rooms are: ', rooms);

// useEffect(() => {
//   axios.get('/thaimessages/sync').then((response) => {
//     // console.log('reponse is:', response);
//     setThai(response.data);
//   });
//   axios.get('/vietmessages/sync').then((response) => {
//     // console.log('reponse is:', response);
//     setViet(response.data);
//   });
// }, []);

// useEffect(() => {
//   const pusher = new Pusher('78ff701f11668f966776', {
//     cluster: 'eu',
//   });

//   const channel = pusher.subscribe('vietcos');
//   channel.bind('inserted', (newM) => {
//     // alert(JSON.stringify(data));
//     setViet([...vietM, newM]);
//   });

//   return () => {
//     channel.unbind_all();
//     channel.unsubscribe();
//   };
// }, [vietM]);

// console.log('these are thaiM: ', thaiM);
