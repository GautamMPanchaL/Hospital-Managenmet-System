import React from 'react'
import Hero from '../componets/Hero'
import Biography from '../componets/Biography.jsx'
import Department from '../componets/Department'
import MessageForm from '../componets/MessageForm'
export default function Home() {
  return (
    <>
    <Hero title = {"The new Title"} imageUrl = {"/hero.png"}/>
    <Biography imageUrl = {"./about.png"}/>
    <Department/>
    <MessageForm/>
    </>
  )
}
