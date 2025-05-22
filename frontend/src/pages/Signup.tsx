import { SignupAuth } from "../components/SignupAuth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return (
    <div>
        <div className="lg:grid grid-cols-2">
            <div>
                <SignupAuth/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    </div>
)}