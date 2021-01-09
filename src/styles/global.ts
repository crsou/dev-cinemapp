import styled, { css, createGlobalStyle } from "styled-components";

interface Device {
  isMobile: boolean;
}

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 35px;
    color: #a8a8b3;
    max-width: 450px;
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    font-size: 17px;
    font-weight: bold;
    transition: opacity 0.2s;
    margin-top: 5px;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const Searchbar = styled.form`
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
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }
`;

export const Movies = styled.div<Device>`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;

  ${(device) =>
    device.isMobile &&
    css`
      overflow-x: scroll;
      flex-wrap: nowrap;
    `}

  div {
    position: relative;
    margin: 10px 10px 0px 0px;

    img {
      cursor: pointer;
      width: 150px;
      height: 200px;
      border-radius: 5px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.6;
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  max-width: 790px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
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
    padding: 15px 15px
  }
`;
