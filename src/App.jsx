/* What we will learn:-
  1. Hooks-> useState, useCallback, useEffect, useRef
  2. How to use tailwind CSS
  3. How to add onClick, ref etc properties in elements inside the html
  4. How to generate a random password
*/

import { use } from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //------------------------------------------------>

  //->HOOK-1 "useCallback(() => {},[dependencies])"
  //In this hum optimize krne ka soch rahe hai function ko

  const passwordGenerator = useCallback(()=>{
    //logic for random passwords
    let randPassword = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str = str + "01234567890"
    if(characterAllowed) str = str + "@#$%!&*{}[]"

    for(let i=1; i<length; i++){
      let character = Math.floor(Math.random() * str.length+1)
      randPassword = randPassword + str.charAt(character)
    }
    setPassword(randPassword)  //giving password by "randPassword" and then setting password 

  },[length,numberAllowed,characterAllowed,setPassword])//we need to use all these dependencies in our function

  //------------------------------------------------>

//ye function password copy krta hai 
  const copyPassword = useCallback(() => {  //ye fn jayega onClick <btn> pe 

    passwordRef.current?.select() //ye ref dedia idhr ab jab bhi click hoga copy, toh <input> copy 
                                  // hojayega saath hi saath highlight hoayega 
    passwordRef.current?.setSelectionRange(0,101)  //sets length kitna copy krna h
    window.navigator.clipboard.writeText(password) //copies password to clipboard

  },[password])

  //------------------------------------------------>

//->HOOK-2 "useEffect(() => {},[dependencies])"
//agr koi bhi dependencies mai bhi ched chaad hui toh function run krdo
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  //------------------------------------------------>

//->HOOK-3 "useRef()"
//jab hume kisi cheeze ko invoke krna hai kisi aur ke reference se
//jaise idhr copy btn dabate hi input ka data copy hojaye 

  const passwordRef = useRef(null)  //ye refrence jayega <input> mai 

  //------------------------------------------------>

  //HTML, Tailwind CSS 
  return (
    <>
      <h1 className='text-4xl text-center text-white mt-7'>Password Generator</h1>
      
      <br /><br />
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-gray-900 bg-gray-800'>

        <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}   //idhr reference dedia
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPassword}  //jb bhi click hoga ye fn call hoga aur usme <input> ka ref called h
          >
            Copy
          </button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className='text-orange-400'>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            id='numberInput'
            defaultChecked = {numberAllowed}
            onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label htmlFor="numberInput" className='text-orange-400'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            id='characterInput'
            defaultChecked = {characterAllowed}
            onChange={() => {setCharacterAllowed((prev) => !prev)}}
            />
            <label htmlFor="characterInput" className='text-orange-400'>Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
