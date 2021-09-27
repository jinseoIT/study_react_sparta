import React from 'react';
import styled from 'styled-components';

function Card(props) {
  const cardInfo = props.cardInfo;

  return (
    <>
      <Wrap>
        <ContentsTitle>단어</ContentsTitle>
        <span>{cardInfo.word}</span>
        <ContentsTitle>설명</ContentsTitle>
        <Description disabled value={cardInfo.description}/>
        <ContentsTitle>예시</ContentsTitle>
        <span>{cardInfo.example}</span>
      </Wrap>
    </>
  )
}

const Wrap = styled.div`
  width: 310px;
  height: 100%;
  background: #fff;
  border: 1px solid #000;
  margin-bottom: 20px;
  border-radius: 4px;
  padding: 10px;
  
  span:last-child{
    color: blue; 
  }
`;

const ContentsTitle = styled.p`
  font-size: 14px;
  font-weight: bolder;
  margin: 10px 0 0 0;
`;

const Description = styled.textarea`
  display: block;
  resize : none;
  width : 300px;
  height: 150px;
`;

export default Card;
