import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRank, getRankFB } from "../redux/modules/rank";
import { useHistory } from 'react-router';

const Message = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const name = useSelector((state) => state.quiz.name);
  const quiz_list = useSelector((state) => state.quiz.quiz_list);
  const answers = useSelector((state) => state.quiz.user_answer_list);
  const user_name = useSelector((state)=>state.rank.user_name);
  
  const input_text = React.useRef(null);
  // 정답만 걸러내기
  let correct = answers.filter((answer, idx) => quiz_list[idx].answer === answer);

  // 점수 계산하기
  let score = (correct.length / answers.length) * 100;
  console.log(correct);
  console.log('점수:', score);

  // 컬러셋 참고: https://www.shutterstock.com/ko/blog/pastel-color-palettes-rococo-trend/
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="outter"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          padding: "0px 10vw",
          boxSizing: "border-box",
          maxWidth: "400px",
          margin: "0px auto",
        }}
      >
        <h1 style={{ fontSize: "1.5em", margin: "0px", lineHeight: "1.4" }}>
          <span
            style={{
              backgroundColor: "#fef5d4",
              padding: "5px 10px",
              borderRadius: "30px",
            }}
          >
            {name}
          </span>
          에게 한마디
        </h1>
        <input
        ref={input_text}
          type="text"
          style={{
            padding: "10px",
            margin: "24px 0px",
            border: "1px solid #dadafc",
            borderRadius: "30px",
            width: "100%",
          }}
          placeholder="한 마디 적기"
        />
        <button
          onClick={() => {
            
            let rank_info = {
                score: parseInt(score),
                name: user_name,
                message: input_text.current.value,
                current: true,
            };
            // 랭킹 정보 넣기
            dispatch(addRank(rank_info));
            dispatch(getRankFB());
            // 주소 이동
            history.push('/ranking');

          }}
          style={{
            padding: "8px 24px",
            backgroundColor: "#dadafc",
            borderRadius: "30px",
            border: "#dadafc",
            cursor: 'pointer'
          }}
        >
          한마디하고 랭킹 보러 가기
        </button>
      </div>
    </div>
  );
};

export default Message;