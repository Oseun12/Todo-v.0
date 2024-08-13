import Image from "next/image";
import { Inter } from "next/font/google";
import Todolist from "./components/Todolist";


export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="bg-slate-400 text-white shadow-lg rounded-lg p-6 w-full max-w-md mb-4">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      </div>
      <div className="w-full max-w-md bg-gray-800 p-1 rounded-lg shadow-md">
        <Todolist />
      </div>
    </div>
  );
  
}
