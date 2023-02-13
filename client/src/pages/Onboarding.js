import {useState} from 'react'
import Nav from '../components/Nav'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from "axios";


const Onboarding = () =>
    {
    const [cookie, setCookie, removeCookie] = useCookies(['user'])
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        user_id: cookie.UserId,
        first_name: '',
        age: '',
        gender: 'man',
        show_gender: false,
        gender_interest: 'woman',
        url: '',
        bio: '',
        fav_prof: '',
        matches: [],
        profile_picture: '',
    });

    let navigate = useNavigate()

    const [file, setFile] = useState(null);

    const handleFileChange = async (e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles[0].size > 5789588) {
            setError('File is too big, please go to https://imagecompressor.com/ and compress it')
        }
        setFile(selectedFiles[0]);
        console.log(file.size)
        };

    const handleChange = (e) =>
        {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
            console.log(formData)
        }


    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put('https://ssersa-tinder-backend.onrender.com/user', formData);
        const success = response.status === 200;

        if (response.status === 409) {
            setError('Email already in use, log in or message support at itcom@sseriga.edu');
        }

        if (success) {
            navigate(`/dashboard`);
        }
    } catch (err) {
        console.error(err);
    }
    };

    return (
        <>
            <div className="onboarding-nav">
            <Nav
                minimal={true}
                setShowModal={() =>
                    {
                    }}
                showModal={false}
            />
            </div>
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
                            <option value="man" selected={formData.gender === "man"}>a man</option>
                            <option value="woman" selected={formData.gender === "woman"}>a woman</option>
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
                        <label htmlFor="file">Profile pics</label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            onChange={handleFileChange}
                            required={true}
                            accept=".jpg, .png, .jpeg, .heif, .webp"
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
    }

export default Onboarding