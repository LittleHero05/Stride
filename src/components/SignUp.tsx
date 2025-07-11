import {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Adjust the import path as necessary

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
    } catch (err) {
      alert(err);
    }
};

return (
    <form onSubmit={handleSignUp} className="space-y-4">
        <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border rounded w-full"
            required
        />
        <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border rounded w-full"
            required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign Up
        </button>
    </form>
    );
}
  