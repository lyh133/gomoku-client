import { useEffect, useState } from 'react'


import style from './Home.module.css'

export default function Home() {


  return (
    <div className={style.container}>
        <label >Choose a dog name:</label> 
        <select name="dog-names" id="dog-names"> 
            <option value="rigatoni">Rigatoni</option> 
            <option value="dave">Dave</option> 
            <option value="pumpernickel">Pumpernickel</option> 
            <option value="reeses">Reeses</option> 
        </select>
    </div>
  )
}