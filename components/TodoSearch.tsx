"use client"
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const TodoSearch = () => {
    const router = useRouter()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = (e.currentTarget[0] as HTMLInputElement).value
        const params = new URLSearchParams(window.location.search)
        params.set("search", value)
        router.push(`${window.location.pathname}?${params}`)
    }
  return (
    <form onSubmit={handleSubmit} className='w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
      <Search width={18} height={18} className='text-gray-400' />
      <input placeholder='Search Todos...' type='text' className='w-[200px] p-2 bg-transparent rounded-md text-sm outline-none' />
    </form>
  )
}

export default TodoSearch
