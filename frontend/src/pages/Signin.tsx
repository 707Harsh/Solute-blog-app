import { Quote } from "../components/Quote"
import { SigninAuth } from "../components/SigninAuth"

export const Signin = () => {
    return (
    <div>
        <div className="lg:grid grid-cols-2">
            <div>
                <SigninAuth/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    </div>
)}