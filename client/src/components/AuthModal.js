import {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AuthModal = ({setShowModal, isSignUp}) => {
const [email, setEmail] = useState(null)
const [password, setPassword] = useState(null)
const [confirmPassword, setConfirmPassword] = useState(null)
const [error, setError] = useState(null)

const navigate = useNavigate()

console.log(email, password, confirmPassword)
const handleClick = () => {
setShowModal(false)
}

const handleSubmit = async (e) =>
    {
    e.preventDefault()
    try {
        if (isSignUp && (password !== confirmPassword)) {
            setError('Passwords do not match')
            return
        }

        if (!email.endsWith("@sseriga.edu") && !email.endsWith("@rgsl.edu.lv")) {
            setError("Email must be from a valid domain (sseriga.edu or rgsl.edu.lv)");
            return;
        }

        const response = await axios.post(`http://localhost:8000/signup`, {email, password})

        const success = response.status === 201

        if (success) {
            navigate(`/onboarding`)
        }
    } catch (error) {
        console.log(error)
    }
    }

return (
    <div className= "auth-modal">
        <div className = "close-icon" onClick={handleClick}>⮾</div>
        <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
        <p>By clicking "Log In" you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
        <form onSubmit = {handleSubmit}>
            <input
                type = "email"
                id = "email"
                name = "email"
                placeholder = "Email"
                required = {true}
                onChange = {(p) => setEmail(p.target.value)}
            />
            <input
                type = "password"
                id = "password"
                name = "password"
                placeholder = "Password"
                required = {true}
                onChange = {(p) => setPassword(p.target.value)}
            />
            <input
                type = "password"
                id = "password-check"
                name = "password-check"
                placeholder = "Confirm Password"
                required = {true}
                onChange = {(p) => setConfirmPassword(p.target.value)}
            />
            <input className="secondary-button" type = "submit"/>
            <p>{error}</p>
        </form>
        AUTH MODAL
    </div>
)
}
export default AuthModal