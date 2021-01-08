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
      opacity: 0.9;
    }

    &:active {
      opacity: 0.8;
    }

    svg {
      margin-right: 4px;
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
    transition: opacity 0.2s;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }

    img {
      width: 150px;
      height: 200px;
      border-radius: 5px;
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
