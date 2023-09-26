

import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export const getSocket = () => {
  return socket;
};


// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:5000');

// export default socket;


