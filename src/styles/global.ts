import styled, { createGlobalStyle } from "styled-components";

export const Movies = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #a8a8b3;
    border-radius: 5px;
    width: 100%;
    padding: 12px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 50px;
      height: 70px;
      border-radius: 2px;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #a8a8b3;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #262626;
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(145deg, #262626 0%, #000 100%);
    --webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  button {
    cursor: pointer;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px
  }
`;
