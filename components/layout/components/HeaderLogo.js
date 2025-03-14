import React from 'react';
import styled from 'styled-components';

const HeaderLogo = () => {
  return <Logo>Fundora</Logo>;
};
const Logo = styled.h1`
  font-weight: bold;
  font-size: 50px;
  margin-left: 10px;
  font-family: 'Playfair Display', serif;
  letter-spacing: 1.5px;
  cursor: pointer;
  text-transform: uppercase;
  position: relative;

  /* Adaptive Gradient Based on Theme */
  background: ${(props) => (props.theme.mode === 'dark'
    ? props.theme.bgImage
    : 'linear-gradient(90deg, #ff8a00, #e52e71)')}; 
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Subtle Glow Effect for Dark Mode */
  ${(props) =>
    props.theme.mode === 'dark' &&
    `text-shadow: 0px 0px 8px rgba(207, 55, 88, 0.3), 
                 0px 0px 12px rgba(37, 196, 224, 0.2);`}

  /* Minimal Hover Effect (No Brightness Increase) */
  &:hover {
    transform: none;
  }
`;


export default HeaderLogo;
