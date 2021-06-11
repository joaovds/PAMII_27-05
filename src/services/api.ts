import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.jussimarleal.com.br/exemplo_api/pessoa',
});

export default api;
