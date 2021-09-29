import React from 'react'
import Card from '../components/Card';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { isLoaded, getWordsFB , moreWorldListFB} from '../redux/modules/word';

function Main() {
  const history = useHistory();
  const dispatch = useDispatch();
  const wordList = useSelector(state => state.word.wordList)
  const lastTimeStamp = useSelector(state => state.word.lastTimeStamp);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (wordList.length === 0) {
      dispatch(isLoaded());
      dispatch(getWordsFB());
    }
    return () => {window.removeEventListener('scroll', handleScroll)}
  }, [lastTimeStamp])


  const MoreList = () => {
    dispatch(moreWorldListFB(lastTimeStamp));
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      MoreList();
    }
  }

  return (
    <>
      <DictionaryArea>
        <h1>신조어 단어장</h1>
        {wordList.map((card, index) => {
          return (
            <React.Fragment key={index}>
              <Card cardInfo={card} />
            </React.Fragment>
            )
        })}
        <BtnArea>
          <UpBtn onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <i className="fas fa-arrow-up"></i>
          </UpBtn>
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
`;

const AddDictionaryBtn = styled.div`
  width: 45px;
  height: 45px;
  background-color: royalblue;
  border-radius: 50%;
  text-align: center;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
  position: fixed;
  top: 5px;
  right: 5px;
  line-height: 45px;
`;

const UpBtn = styled.div`
  width: 45px;
  height: 45px;
  background-color: purple;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  position: fixed;
  bottom: 5px;
  right: 5px;
  border-radius: 50%;
  text-align: center;
  line-height: 45px;
`;

export default Main
