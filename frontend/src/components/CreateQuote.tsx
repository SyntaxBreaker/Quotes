import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../providers/UserProvider.tsx";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const CreateQuote: React.FC = () => {
    const [user, setUser] = useContext(UserContext);
    const [info, setInfo] = useState<null | string>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(info) {
            alert(info);
            setInfo(null);
        }
    }, [info]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const {quote, author} = event.target;

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/add`,
            data: {
                quote: quote.value,
                author: author.value
            },
            withCredentials: true,
        })
            .then(res => {
                setInfo('A quote was created successfully');
                navigate('/');
            })
            .catch(res => setInfo('We cannot create a quote'))
    }

    return (
        <>
            {info && <p>{info}</p>}
            <form onSubmit={handleSubmit}>
                <label>Quote:</label>
                <input type="text" name="quote" required />
                <label>Author:</label>
                <input type="text" name="author" required />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default CreateQuote;