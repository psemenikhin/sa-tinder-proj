import TinderCard from 'react-tinder-card';
import {useState} from 'react';
import ChatContainer from '../components/ChatContainer';

const Dashboard = () =>
    {

    const db = [
        {
            name: 'Richard Hendricks',
            url: '../images/richard.jpg',
        },
        {
            name: 'Erlich Bachman',
            url: 'https://this-person-does-not-exist.com/img/avatar-e924f72593e3a6a7ad17c0b32a4b0e7e.jpg'
        },
        {
            name: 'Monica Hall',
            url: 'https://this-person-does-not-exist.com/img/avatar-e924f72593e3a6a7ad17c0b32a4b0e7e.jpg'
        },
        {
            name: 'Jared Dunn',
            url: 'https://this-person-does-not-exist.com/img/avatar-e924f72593e3a6a7ad17c0b32a4b0e7e.jpg'
        },
        {
            name: 'Dinesh Chugtai',
            url: 'https://this-person-does-not-exist.com/img/avatar-e924f72593e3a6a7ad17c0b32a4b0e7e.jpg'
        }
    ]

    const characters = db
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) =>
        {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
        }

    const outOfFrame = (name) =>
        {
        console.log(name + ' left the screen!')
        }

    return (
        <div className='dashboard'>
            <ChatContainer/>
            <div className='swipe-container'>
                <div className='card-container'>
                    {characters.map((character) =>
                        <TinderCard
                            className='swipe'
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}>
                                <div style={{backgroundImage: 'url(' + character.url + ')'}}
                                     className='card'>
                                    <h3>{character.name}</h3>
                                </div>
                        </TinderCard>
                    )}
                </div>
                <div className="swipe-info">
                    {lastDirection ? <p>Swipe direction: {lastDirection}</p> : <p/>}
                </div>
            </div>
        </div>
    )
    }
export default Dashboard