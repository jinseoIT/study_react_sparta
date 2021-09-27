import React from 'react'
import Card from '../components/Card';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import {getWordsFB} from '../redux/modules/word'

function Main() {
  const history = useHistory();
  const dispatch = useDispatch();
  const wordList = useSelector((state) => state.word.wordList)
  console.log(wordList);

  React.useEffect(() => {
    console.log(wordList.length);
    if (wordList.length === 0) {
      dispatch(getWordsFB());
    }
    console.log('useEffect자리');
  })

  return (
    <>
      <DictionaryArea>
        <h1>MY DICTIONARY</h1>
        {wordList.map((card, index) => {
          return (
            <React.Fragment key={index}>
              <Card cardInfo={card} />
            </React.Fragment>
            )
        })}
        <BtnArea>
          <AddDictionaryBtn onClick={()=> history.push('/addDictionary')}>
            <i className="fas fa-plus"></i>
          </AddDictionaryBtn>
        </BtnArea>
      </DictionaryArea>
    </>
  )
}

const DictionaryArea = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`;

const BtnArea = styled.div`
  width: 310px;
  height: 100%;
  background: #fff;
  position: relative;
`;

const AddDictionaryBtn = styled.div`
  width: 75px;
  height: 75px;
  background-color: royalblue;
  border-radius: 50%;
  text-align: center;
  font-size: 50px;
  color: #fff;
  cursor: pointer;
  position: absolute;
  bottom: -60px;
  right: 0;
`;
export default Main
