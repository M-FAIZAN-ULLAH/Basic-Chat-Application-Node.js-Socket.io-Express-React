import React, { useState } from 'react';
import { useEffect } from 'react';
import { getSocket } from "../../services/socketioConfig";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Chat = () => {

  const socket = getSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  // eslint-disable-next-line 
  const [error, setError] = useState('');

  const timestampToTimeString = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };


  // let time = new Date().getTime()
  
  useEffect(() => {
    const time = new Date().getTime();
    socket.on('Message', (message) => {
      console.log('Connection Established! ', message.text);
      setMessages([...messages, { text: message.text, createdAt: timestampToTimeString(time) , type: 'text' }]);
    });

    socket.on('LocationMessage', (locationMessage) => {
      setMessages([...messages, { ...locationMessage, type: 'location' }]);
    });

    return () => {
      socket.off('Message');
      socket.off('LocationMessage');
    };
  }, [socket, messages]);

  const sendMessage = () => {
    socket.emit("sendMessage", message, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message Delivered");
      setMessage('');
    });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          socket.emit("sendLocation", {
            latitude: latitude,
            longitude: longitude
          }, () => {
            console.log("Location shared!")
          });
        },
        (error) => {
          setError(`Error getting location: ${error.message}`);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="message"
            label="Write Message"
            name="message"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>Send Message</Button>
          <Button variant="contained" onClick={getLocation}>Send Location</Button>
        </div>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <div key={index}>
              {msg.type === 'text' ? (
                <>
                <p>{msg.text} - {msg.createdAt}</p>
                
                </>
              ) : (
                <a href={`https://google.com/maps?q=${latitude},${longitude}`}>Click to view </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
