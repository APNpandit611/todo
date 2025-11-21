"use client";
import createUser from "@/components/createUser";
import getUser from "@/components/getUser";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  
  useEffect(() => {
    const userCreate = async () => {
      try {
        await createUser(); // call the actual function
        console.log("User created");
      } catch (err) {
        console.error("Failed to create user:", err);
      }
    }

    userCreate();
  },[])

  const getUserData = async () => {
    try {
      const user = await getUser();
      if (user) {
        setUsers(user);
        console.log("Users fetched:", user);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <p>hello world</p>
      <button onClick={getUserData} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"> click me </button>
      {users.map((item) => (
        <div key={item.id}>
          <p>{item.name} - {item.email}</p>
        </div>
      ))}
    </div>
  );
}
