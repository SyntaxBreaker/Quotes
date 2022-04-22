import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../providers/UserProvider.tsx";
import axios from 'axios';
import EditQuote from "./EditQuote.tsx";
import styled from "styled-components";

const QuotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
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
  
  h2 {
    color: ivory;
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

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/'
        })
            .then(res => setQuotes(res.data))
            .catch(err => console.log(err))
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
            {quotes.length !== 0 && quotes.map(quote => (
                <QuoteContainer key={quote.id}>
                    <h2>"{quote.quote}"</h2>
                    <p>Author: {quote.author}</p>
                    <StyledHr />
                    <p>Created by: {quote.createdBy}</p>
                    {user && user['email'] === quote['createdBy'] && <button onClick={() => {setIsOpen(true); setQuoteToEdit(quote); }}>Edit it</button>}
                    {user && user['email'] === quote['createdBy'] && <button onClick={() => removeQuote(quote.id)}>Remove</button>}
                </QuoteContainer>
            ))}
            {isOpen && <EditQuote setIsOpen={setIsOpen} quoteToEdit={quoteToEdit} setInfo={setInfo} />}
        </QuotesContainer>

    )
}

export default Quotes;