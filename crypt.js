import { hash as _hash } from 'bcrypt';
const hash = await _hash('admi123', 12);
console.log(hash)