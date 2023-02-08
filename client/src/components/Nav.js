import logo from '../images/SA_logo.png'
import { useNavigate } from 'react-router-dom'

const Nav = ({authToken, minimal, setShowModal, showModal, setIsSignUp}) =>
    {
       const navigate = useNavigate()

    const handleClick = () =>
        {
            setShowModal(true)
            setIsSignUp(false)
            console.log('clicked')
        }

    const handleLogoClick = () => {
    navigate('/');
    }

    return (
        <nav>
            <div className="logo-container" onClick={handleLogoClick}>
                <img className="logo" src={logo} alt="Logo should be here, but something broke"/>
            </div>
            {!authToken && !minimal && <button
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}>Log in</button>
            }
        </nav>
    )
    }
export default Nav