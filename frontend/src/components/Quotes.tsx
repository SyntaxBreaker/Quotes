import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../providers/UserProvider.tsx";
import axios from 'axios';
import EditQuote from "./EditQuote.tsx";
import styled from "styled-components";

const QuotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const QuoteContainer = styled.div`
  margin: .5rem;
  text-align: center;
  padding: .8rem;
  color: #E2E9F1;
  background-color: #0055B0;
  flex-wrap: wrap;
  flex-basis: 30%;
  
  h2 {
    color: ivory;
  }
`;

const Preloader = styled.div`
  display: flex;
  position: absolute;
  top: 15%;
  left: 50%;
  height: 50px;
  width: 50px;
  border: 4px rgba(0, 0, 0, 0.25) solid;
  border-top: 4px #0055B0 solid;
  border-radius: 50%;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(359deg);
    }

    to {
      transform: rotate(0deg);
    }
  }
`;

const StyledHr = styled.hr`
  width: 100%;
  border-top: 1px solid #090A0C;
`;

interface Quote {
    id: string;
    quote: string;
    author: string;
    createdBy: string;
}

function Quotes() {
    const [user, setUser] = useContext(UserContext);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [quoteToEdit, setQuoteToEdit] = useState<Quote | object>({});
    const [info, setInfo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/`
        })
            .then(res => {
                setQuotes(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        if(info) {
            alert(info);
            setInfo(null);
        }
    }, [info])

    const removeQuote = (id) => {
        axios({
            method: 'delete',
            url: `http://localhost:3000/remove/${id}`,
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => setInfo(`The quote has been removed`))
            .catch(err => setInfo(`The quote cannot be deleted`))
    }

    return (
        <QuotesContainer>
            {isLoading ? <Preloader></Preloader> : (
            quotes.length !== 0 && quotes.map(quote => (
                <QuoteContainer key={quote.id}>
                    <h2>"{quote.quote}"</h2>
                    <p>Author: {quote.author}</p>
                    <StyledHr />
                    <p>Created by: {quote.createdBy}</p>
                    {user && user['email'] === quote['createdBy'] && <button onClick={() => {setIsOpen(true); setQuoteToEdit(quote); }}>Edit it</button>}
                    {user && user['email'] === quote['createdBy'] && <button onClick={() => removeQuote(quote.id)}>Remove</button>}
                </QuoteContainer>
            )))}
            {isOpen && <EditQuote setIsOpen={setIsOpen} quoteToEdit={quoteToEdit} setInfo={setInfo} />}
        </QuotesContainer>

    )
}

export default Quotes;