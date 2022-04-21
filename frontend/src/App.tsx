import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Quotes from "./components/Quotes.tsx";
import CreateQuote from "./components/CreateQuote.tsx";
import styled from "styled-components";

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0055B0;
  height: 2rem;
`;

const StyledLink = styled(Link)`
  color: #E2E9F1;
  text-decoration: none;
  margin: 0.5rem;
`

function App() {
  return (
    <MainContainer>
        <BrowserRouter>
            <StyledNav>
                <div>
                    <StyledLink to=''>Homepage</StyledLink>
                    <StyledLink to='create'>Create a quote</StyledLink>
                </div>
                <div>
                    <StyledLink to='login'>Login</StyledLink>
                    <StyledLink to='register'>Register</StyledLink>
                </div>
            </StyledNav>
            <Routes>
                <Route path='' element={<Quotes />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='create' element={<CreateQuote />} />
            </Routes>
        </BrowserRouter>
    </MainContainer>
  );
}

export default App;
