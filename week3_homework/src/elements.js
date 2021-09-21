import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => props.is_main? "center" : "space-between"};
  padding: 16px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  padding: 10px 36px;
  background: #dadafc;
  border: #dadafc;
  border-radius: 30px;
  margin: 36px 0px;
`;

export const Img = styled.img`
  width: 60vw;
  margin: 16px;
`;

export const Highlight = styled.span`
  font-weight: bold;
  background: #fef5d4;
  padding: 5px 10px;
  border-radius: 30px;
`;