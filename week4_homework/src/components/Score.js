import React from 'react'
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { resetAnswer } from '../redux/modules/quiz';

import { Container, Button, Highlight } from './elements';

const Score = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const quiz_list = useSelector((state) => state.quiz.quiz_list);
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list);
  
  const _score =
    (100 / quiz_list.length) *
    quiz_list.filter((q, idx) => {
      return q.answer === user_answer_list[idx];
    }).length;
  
  const score = Math.round(_score);

  const replay = () => {
    dispatch(resetAnswer());
    history.push('/')
  }
  return (
    <Container is_main>
      <h3>
        <Highlight
        >{props.name}</Highlight> 퀴즈에 대한 내 점수는 <br />
        <Highlight>{score}</Highlight>점
      </h3>
      <p>항해99 3기 화이팅!</p>
      <Button
        onClick={() => replay()}
      >
        다시 풀러가기</Button>
      <Button>{props.name}에게 한 마디</Button>
    </Container>
  )
}

export default Score
