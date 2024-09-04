import Image from "next/image";
import { Inter } from "next/font/google";
import Todolist from "./Todolist";
import Register from "./Register";


export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      
      <div className="w-full max-w-md  p-1 rounded-lg shadow-md text-slate-100">
        <Register />
      </div>
    </div>
  );
  
}
