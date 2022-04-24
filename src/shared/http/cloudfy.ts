import axios from 'axios';

// Pode ser algum servidor executando localmente:
// http://localhost:3000

const cloudfyAPI = axios.create({
  baseURL: 'https://api.github.com',
});

export default cloudfyAPI;
