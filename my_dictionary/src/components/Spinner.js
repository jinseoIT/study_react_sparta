import React from 'react';
import styled from 'styled-components';

const Spinner = (props) => {
  return (
    <Outter>
      <i className="fas fa-circle-notch"></i>
    </Outter>
  );
}

const Outter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7b7b85;
  opacity: 80%;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
    svg {
      color: #fff;
      font-size: 65px;
      animation: rotate_image 1.2s linear infinite;
      transform-origin: 50% 50%;
    }
  @keyframes rotate_image {
     100% {
       transform: rotate(360deg);
     }
  }
`;

export default Spinner;