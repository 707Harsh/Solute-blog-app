import type { SigninInput } from "@harshchaudhary/solute-common"
import { Inputbox } from "./Inputbox"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useProgress } from '@bprogress/react'

export const SigninAuth = () => {
    const [authInput, setAuthInput] = useState<SigninInput>({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const { start, stop } = useProgress()

    async function sendRequest() {
      try {
        start()
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, authInput)
        const token = response.data.jwt
        const name = response.data.name
        localStorage.setItem('name', name)
        localStorage.setItem('token', token)
        stop()
        navigate('/blogs')
      } catch (error) {
        stop()
        console.error("Error during signin:", error)
        // Handle error (e.g., show a notification or alert)
        alert("Signin failed. Please try again.")
      }
    }

    return (
        <div className="h-screen flex justify-center items-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl text-center font-extrabold mb-2">Sign in</h2>
          <p className="mb-6 text-gray-600 text-center">
            Don't have an account? <Link to="/signup" className="text-gray-600 underline">Sign up</Link>
          </p>

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
              Sign In
            </button>
        </div>
      </div>
    )
}