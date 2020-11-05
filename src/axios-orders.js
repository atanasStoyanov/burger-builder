import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-8afe6.firebaseio.com'
});

export default instance;