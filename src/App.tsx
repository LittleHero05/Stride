import { useState } from 'react'
import SignUp from './components/SignUp';
import Login from './components/Login';
import './App.css'


function App() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-3xl font-bold">🏃‍♀️ Stride — Run Analytics</h1>
      <SignUp />
      <Login />
    </div>
  );
}

export default App
