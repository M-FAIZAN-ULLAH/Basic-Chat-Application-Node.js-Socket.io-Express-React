import React from 'react';

import { useEffect ,useState } from 'react';
import { getSocket } from "../../services/socketioConfig";
// import socket  from "../../services/socketioConfig";

import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import LocationOnIcon from '@material-ui/icons/LocationCityRounded';

// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:5000');

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '82vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});



const Home = () => {

  const classes = useStyles();

  const navigate = useNavigate()
  const location = useLocation();
  const { Name, Room } = location.state;

  //////////////////////////////////////////////////////////////

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



useEffect(() => {
  
  // Emit the 'join' event when component mounts
  socket.emit('join', { name: Name, room: Room }, (error) => {
    console.log(Name, Room)
    if(error) {
      alert(error)
      navigate("/")
    }
  }); 


  socket.on('Message', (message) => {
    setMessages(prevMessages => [...prevMessages, { ...message ,text: message.text, createdAt: timestampToTimeString(message.createdAt) , type: 'text' }])
  });

  socket.on('LocationMessage', (locationMessage) => {
    setMessages(prevMessages => [...prevMessages, { ...locationMessage, type: 'location' }]);
  });

  return () => {
    socket.off('Message');
    socket.off('LocationMessage');
  };
  // eslint-disable-next-line
}, [socket, Name, Room]);





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



  //////////////////////////////////////////////////////////////

  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                {/* users name */}
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItem>
                    
                </List>
            </Grid>
            <Grid item xs={8}>
                     <List className={classes.messageArea}>
                        {messages.map((msg, index) => (
                            <ListItem key={index}>
                            <Grid container>
                                <Grid item xs={12}>
                                <ListItemText
                                    align={msg.type === 'text' ? 'right' : 'left'}
                                    primary={msg.type === 'text' ? msg.text :  <p> Location :<a href={`https://google.com/maps?q=${latitude},${longitude}`}>Click to view </a></p>}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <ListItemText
                                    align={msg.type === 'text' ? 'right' : 'left'}
                                    secondary={
                                    msg.type === 'text' ? <p>{msg.createdAt}</p> : <p>{msg.createdAt}</p>
                                    }
                                    
                                />
                                
                                </Grid>
                                
                            </Grid>
                           
                            </ListItem>
                            
                        ))}
                        
                        </List>

                <Divider />
                {/* send message */}
                <Grid container style={{padding: '8px'}}>
                    <Grid item xs={11}>
                        <TextField 
                        id="outlined-basic-email"
                        label="Type Something"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab onClick={sendMessage} color="primary" aria-label="add"><SendIcon /></Fab>
                        <Fab onClick={getLocation} color="primary" aria-label="add"><LocationOnIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Home;

