import {Bitski} from 'bitski';

const buildBitskiClient = () => new Bitski('6167571d-1838-4643-891e-6e06d12c6cbb', 'http://localhost:3002/callback', ['email']);

export default buildBitskiClient;
