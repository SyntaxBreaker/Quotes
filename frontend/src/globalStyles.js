import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
  
  html, body {
    height: 100%;
    width: 100%;
    background-color: #E1E1DF;
  }
  
  h2, p {
    margin: .6rem 0;
  }
  
  form {
    height: 100%;
    width: 90%;
    position: relative;
    top: 30px;
    left: 5%;
    display: flex;
    flex-direction: column;
    background-color: #0055B0;
    border-radius: 5px;
    padding: 1rem;
    border: 1px solid black;
    
    button {
      margin: .8rem auto 0 auto;
    }
    
    p {
      text-align: center;
      font-size: 21px;
      color: #E2E9F1;
    }

    label {
      margin: .3rem 0;
      color: #E2E9F1;
      text-align: center;
    }

    input {
      color: black;
      width: 80%;
      height: 20px;
      background: #FFFFFF;
      margin: .3rem auto;
    }
    
    @media (min-width: 768px) {
      & {
        width: 50%;
        left: 25%;
      }
    }
  }
  
  button {
    display:inline-block;
    padding: .35em 1.2em;
    border: .1em solid transparent;
    margin: .8rem .2rem 0 .2rem;
    border-radius: .12em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto',sans-serif;
    font-weight: 300;
    color: black;
    background-color: #E2E9F1;
    text-align: center;
    transition: all .2s;
    width: 100px;

    &:hover{
      color: #000000;
      background-color: #D9E8F5;
    }
    @media all and (max-width:30em){
      & {
        display:block;
        margin: .4em auto;
      }
  }
`;

export default GlobalStyles;