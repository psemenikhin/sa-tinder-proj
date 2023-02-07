import {useState} from 'react'
import Nav from '../components/Nav'


const Onboarding = () =>
    {
    const [formData, setFormData] = useState({
        user_id: '',
        first_name: '',
        age: '',
        gender: 'man',
        show_gender: false,
        gender_interest: 'woman',
        email: '',
        url: '',
        bio: '',
        fav_prof: '',
        matches: []
    })
    const handleChange = (e) =>
        {
        console.log('e', e)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
        }

    console.log(formData)

    const handleSubmit = () =>
        {
        console.log('submitted')
        }
    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() =>
                    {
                    }}
                showModal={false}

            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">Your first name:</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="Enter it here (duh)"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Your age:</label>
                        <input
                            id="age"
                            type="number"
                            name="age"
                            placeholder="How old are you?"
                            required={true}
                            value={formData.age}
                            onChange={handleChange}
                        />

                        <label>You identify as...</label>
                        <select className="gender-id-list"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}>
                            <option value="male" selected={formData.gender === "man"}>male</option>
                            <option value="female" selected={formData.gender === "woman"}>female</option>
                            <option value="other" selected={formData.gender === "other"}>non-binary/other</option>
                        </select>

                        <div className="gender-tick">
                            <label htmlFor="show-gender">I want my gender to be shown on my profile</label>
                            <input
                                id="show-gender"
                                type="checkbox"
                                checked={formData.show_gender}
                                name="show_gender"
                                onChange={handleChange}
                            />
                        </div>
                        <label>You want to see hot...</label>
                        <div className="multiple-input-container">
                            <div className="radio-set">
                                <input
                                    id="woman-gender-interest"
                                    type="radio"
                                    name="gender_interest"
                                    value={"woman"}
                                    checked={formData.gender_interest === "woman"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="woman-gender-interest">Women</label>
                            </div>
                            <div className="radio-set">
                                <input
                                    id="man-gender-interest"
                                    type="radio"
                                    name="gender_interest"
                                    value={"man"}
                                    checked={formData.gender_interest === "man"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="man-gender-interest">Men</label>
                            </div>
                            <div className="radio-set">
                                <input
                                    id="other-gender-interest"
                                    type="radio"
                                    name="gender_interest"
                                    value={"both"}
                                    checked={formData.gender_interest === "both"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="other-gender-interest">People</label>
                            </div>
                        </div>

                        <label htmlFor="about" className="bio">About me:</label>
                        <input
                            id="about"
                            type="text"
                            name="bio"
                            onChange={handleChange}
                            required={true}
                            placeholder="Just don't lie and you're good."
                            value={formData.bio}
                        />
                        <input type="submit"/>

                    </section>

                    <section>
                        <label htmlFor="pictures">Profile pics</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            <img src={formData.url} alt="profile pic preview"/>
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
    }
export default Onboarding