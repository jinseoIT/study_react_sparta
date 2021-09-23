import React from 'react'
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAnswer } from '../redux/modules/quiz';

import { Container, Button, Highlight } from './elements';

function Quiz(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const quiz_list = useSelector((state) => state.quiz.quiz_list)
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list);
  const [progressCnt, setProgressCnt] = React.useState(0);

  const setAnswer = (user_answer) => {
    /* 프로그래스바 증가 */
    setProgressCnt(progressCnt+1);
    dispatch(addAnswer(user_answer));
  };

  React.useEffect(() => {
    if (user_answer_list.length === quiz_list.length) {
      history.push('/message');
      return;
    }
  }, [user_answer_list])

  if (user_answer_list.length === quiz_list.length) {
    return null;
  }
  
  
  return (
    <Container>
      <ProgressBar>
        <HighLight width={(progressCnt / quiz_list.length) * 100 + '%'} />
        <Dot/>
      </ProgressBar>
      <div>
        <p>
          <Highlight>{user_answer_list.length + 1}번 문제</Highlight>
        </p>
        <h3>{quiz_list[user_answer_list.length].question}</h3>
      </div>

      <div>
        <Button
          onClick={() => setAnswer(true) }
          style={{ width: '50px', height: '50px', margin: '16px'}}
        >
          O
        </Button>

        <Button
          onClick={() => setAnswer(false) }
          style={{ width: '50px', height: '50px', margin: '16px'}}
        >
          X
        </Button>
      </div>
    </Container>
  )
}

const ProgressBar = styled.div`
  background: #eee;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;
const HighLight = styled.div`
  background: #673ab7;
  transition: 1s;
  width: ${(props) => props.width};
  height: 20px;
  border-radius: 10px;
`;

const Dot = styled.div`
  width: 40px;
  height: 40px;
  background: #fff;
  border: 5px solid #673ab7;
  border-radius: 40px;
  margin: 0px 0px 0px -20px;
`;

export default Quiz
