import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Adjust the import path as necessary

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in");
        }
        catch (err) {
            alert(err);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
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
                Login
            </button>
        </form>
    )
}