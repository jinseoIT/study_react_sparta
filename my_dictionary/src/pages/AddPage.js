import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addWordFB} from '../redux/modules/word';

function AddPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const wordRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const exampleRef = React.useRef(null);

  /* 단어 추가하기 Action*/
  const addWordEvent = () => {
    const wordInfo = {};
    const word = wordRef.current.value;
    const description = descriptionRef.current.value;
    const example = exampleRef.current.value;
    wordInfo['word'] = word;
    wordInfo['description'] = description;
    wordInfo['example'] = example;
    dispatch(addWordFB(wordInfo));
    history.push('/');
  }
  
  return (
    <>
      <AddWrap>
        <ContentArea>
          <BackBtn onClick={() => history.push('/')}>
            <i className="fas fa-angle-left"></i>
          </BackBtn>
          <h1>단어 추가하기</h1>
            <p>단어</p>
            <input type="text" ref={wordRef}></input>
            <p>설명</p>
            <input type="text" ref={descriptionRef}></input>
            <p>예시</p>
          <input type="text" ref={exampleRef}></input>
          <AddBtn onClick={addWordEvent}>추가하기</AddBtn>
        </ContentArea>
      </AddWrap>
    </>
  )
}

const AddWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  
`;

const ContentArea = styled.div`
  position: relative;
  width: 350px;
  h1 {
    text-align: center;
  }
  input {
    width: 100%;
    padding: 0;
  }
`

const AddBtn = styled.button`
  display: block;
  background-color: royalblue;
  width: 300px;
  height: 35px;
  cursor: pointer;
  text-align: center;
  border-radius: 6px;
  border: none;
  color: #fff;
  margin: 20px auto;
`

const BackBtn = styled.div`
  width: 50px;
  height: 50px;
  background-color: royalblue;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  font-size: 35px;
  position: absolute;
  top: 0px;
  left: -10px;
  cursor: pointer;
`;

export default AddPage
