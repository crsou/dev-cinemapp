import styled from "styled-components";

export const Form = styled.form`
  margin-top: 5vh;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 50px;
    max-width: 400px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #fff;
    background: #353740;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 50px;
    height: 50px;
    background: #b71a51;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    transition: opacity 0.2s;

    svg {
      margin-top: 4px;
    }

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.8;
    }
  }
`;
