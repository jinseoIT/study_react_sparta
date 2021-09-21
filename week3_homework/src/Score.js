import React from "react";
import { useSelector } from "react-redux";
import { Container, Button, Highlight } from "./elements";

const Score = (props) => {
  const quiz_list = useSelector((state) => state.quiz.quiz_list);
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list);

  const _score =
    (100 / quiz_list.length) *
    quiz_list.filter((q, idx) => {
      return q.answer === user_answer_list[idx];
    }).length;

  const score = Math.round(_score);
  return (
    <Container is_main>
      <h3>
        <Highlight>{props.name}</Highlight> 퀴즈에 대한 내 점수는 <br />
        <Highlight>{score}</Highlight>점
      </h3>

      <p>스파르타 코딩클럽 화이팅!</p>

      <Button>{props.name}에게 한 마디</Button>
    </Container>
  );
};

export default Score;