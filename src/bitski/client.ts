import {Bitski} from 'bitski';

const buildBitskiClient = () => new Bitski(process.env.REACT_APP_CLIENT_ID!, process.env.REACT_APP_CALLBACK_URL, ['email']);

export default buildBitskiClient;
