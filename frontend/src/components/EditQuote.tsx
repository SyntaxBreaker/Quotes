import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {UserContext} from "../providers/UserProvider.tsx";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: 20%;
  top: 8%;
`;

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    quoteToEdit: {};
    setInfo: React.Dispatch<React.SetStateAction<string>>;
}

const EditQuote: React.FC<Props> = ({setIsOpen, quoteToEdit, setInfo}) => {
    const [user, setUser] = useContext(UserContext);

    const handleSubmit = event => {
        event.preventDefault();

        const {quote, author} = event.target;
        axios({
            method: 'patch',
            url: `http://localhost:3000/edit/${quoteToEdit.id}`,
            data: {
                quote: quote.value,
                author: author.value
            },
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                setIsOpen(false);
                setInfo(`The quote has been edited`)
            })
            .catch(err => {
                setIsOpen(false);
                setInfo(`The quote could not be edited`)
            })
    }
    return (
        <div>
            <StyledForm onSubmit={handleSubmit}>
                <label>Quote:</label>
                <input type="text" name="quote" required />
                <label>Author:</label>
                <input type="text" name="author" required />
                <button type="submit">Submit</button>
            </StyledForm>
        </div>
    )
}

export default EditQuote;