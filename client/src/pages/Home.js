import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal";
import {useState} from 'react'

const Home = () =>
    {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const authToken = false

    const handleClick = () =>
        {
        console.log('clickity')
        setShowModal(true)
        setIsSignUp(true)
        }
    return (
        <div className="overlay">
            <Nav minimal={false}
                 setShowModal={setShowModal}
                 showModal={showModal}
                 isSignUp={isSignUp}
            />
            <div className="home">
                <h1 className="motto">Study Hard, Swipe Harder®</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Sign Out' : 'Create Account'}
                </button>

                {showModal &&
                    <AuthModal setShowModal={setShowModal} setIsSignUp={isSignUp}/>
                }

            </div>
        </div>
    )
    }
export default Home