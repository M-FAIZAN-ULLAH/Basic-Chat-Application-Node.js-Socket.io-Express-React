import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function Signup() {

  // const [name, setName] = React.useState()
  // const [room, setRoom] = React.useState()

  
  const navigate = useNavigate();
  
  // const handleSubmit = (event) => {
    
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   setName(data.get('name'))
  //   setRoom(data.get('room'))
  //   navigate('/home',  { state: { Name: name, Room: room } })
  //   // console.log({
  //   //   name: data.get('name'),
  //   //   room: data.get('room'),
  //   // });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newName = data.get('name');
    const newRoom = data.get('room');
    navigate('/home', { state: { Name: newName, Room: newRoom } });
    // navigate(Home, { state: { Name: newName, Room: newRoom } });
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to cyborg Channel
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="room"
              label="Room"
              name="room"
              autoComplete="off"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Join
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
