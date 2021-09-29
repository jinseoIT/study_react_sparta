import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { isLoaded, updateWordFB, deleteWordFB } from '../redux/modules/word';

function Card(props) {
  const dispatch = useDispatch();
  const [cardInfo, setCardInfo] = React.useState(props.cardInfo);
  const [updateLock, setUpdateLock] = React.useState(cardInfo.updateLock);
  const [updateBtnShow, setUpdateBtnShow] = React.useState('none');
  
  const updateLockToggle = () => {
    setUpdateLock(updateLock ? false : true);
    setUpdateBtnShow(updateBtnShow === 'none' ? 'block' : 'none');
  }

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setCardInfo({...cardInfo, [name]: value})
  }

  const updateWord = () => {
    const confirmYn = window.confirm('수정하시겠습니까?');
    if (confirmYn) {
      dispatch(isLoaded());
      dispatch(updateWordFB(cardInfo))
      updateLockToggle();
    }
  }
  const deleteWord = () => {
    const confirmYn = window.confirm('단어를 삭제하시겠습니까?');
    if (confirmYn) {
      dispatch(isLoaded());
      dispatch(deleteWordFB(cardInfo.id))
    }
  }
  
  return (
    <>
      <Wrap>
        <IconArea>
          <a href="#!" onClick={updateLockToggle} style={{color:'#5b5757'}}>
            <i className="fas fa-edit"></i>
          </a>
          <a href="#!" onClick={deleteWord} style={{color:'#ac1f5c'}}>
            <i className="far fa-trash-alt"></i>
          </a>
        </IconArea>
        <ContentsTitle>단어</ContentsTitle>
        <input
          type="text"
          name="word"
          value={cardInfo.word}
          disabled={updateLock}
          onChange={handleChnage}
        />
        <ContentsTitle>설명</ContentsTitle>
        <Description
          name="description"
          value={cardInfo.description}
          disabled={updateLock}
          onChange={handleChnage}
        />
        <ContentsTitle>예시</ContentsTitle>
        <input type="text"
          name="example"
          style={{color:'#0d4fbf'}}
          value={cardInfo.example}
          disabled={updateLock}
          onChange={handleChnage}
        />
        <UpdateBtn
          style={{ display: `${updateBtnShow}` }}
          onClick={updateWord}
        >
          수정하기
        </UpdateBtn>
      </Wrap>
    </>
  )
}

const Wrap = styled.div`
  position: relative;
  width: 310px;
  height: 100%;
  background: #fff;
  /* border: 1px solid #1c1b19; */
  box-shadow: 0px 10px 15px #9f9f9f;
  border-radius: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  padding: 10px 10px 10px 15px;
  color: #4a535d;
    input {
      width: 96%;
      border-radius: 6px;
    }
    input:last-child {
      color: blue;
    }
    textarea {
      border-radius: 6px;
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

const IconArea = styled.div`
  position: absolute;
  right:5px;
  svg {
    margin-right: 12px;
    cursor: pointer;
  }
`;
const UpdateBtn = styled.button`
  background-color: royalblue;
  border: none;
  color: #fff;
  border-radius: 4px;
  float: right;
  margin-top: 10px;
  cursor: pointer;
`;

export default Card;
