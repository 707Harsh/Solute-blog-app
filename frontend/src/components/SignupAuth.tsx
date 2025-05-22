import type { SignupInput } from "@harshchaudhary/solute-common"
import { Inputbox } from "./Inputbox"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useProgress } from '@bprogress/react'

export const SignupAuth = () => {
    const [authInput, setAuthInput] = useState<SignupInput>({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const { start, stop } = useProgress()

    async function sendRequest() {
      try {
        start()
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, authInput)
        const token = response.data.jwt
        const name = response.data.name
        localStorage.setItem('name', name)
        localStorage.setItem('token', token)
        stop()
        navigate('/blogs')
      } catch (error) {
        stop()
        console.error("Error during signup:", error)
        // Handle error (e.g., show a notification or alert)
        alert("Signup failed. Please try again.")
      }
    }

    return (
        <div className="h-screen flex justify-center items-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl text-center font-extrabold mb-2">Create an account</h2>
          <p className="mb-6 text-gray-600 text-center">
            Already have an account? <Link to="/signin" className="text-gray-600 underline">Sign in</Link>
          </p>

            <Inputbox label="Name" type="text" placeholder="Enter your name" onChange={(e)=>{
                setAuthInput({
                    ...authInput,
                    name: e.target.value
                })
            }}/>

            <Inputbox label="Email" type="email" placeholder="Enter your email" onChange={(e)=>{
                setAuthInput({
                    ...authInput,
                    email: e.target.value
                })
            }} />

            <Inputbox label="Password" type="password" placeholder="Enter your password" onChange={(e)=>{
                setAuthInput({
                    ...authInput,
                    password: e.target.value
                })
            }} />

            <button
              onClick={sendRequest}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
        </div>
      </div>
    )
}