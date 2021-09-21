// 어떤 데이터를 넣을거야 -> 퀴즈 목록 / 유저 정답 목록
// 어떻게 수정 해볼거야 -> 유저가 선택한 오엑스 정답을 정답 목록에 추가해줄거야!

const ADD_ANSWER = "quiz/ADD_ANSWER";

export const addAnswer = (user_answer) => {
  return { type: ADD_ANSWER, user_answer };
};

const initialState = {
  quiz_list: [
    { question: "스파르타 코딩클럽 사이트는 React.js로 만들어졌다.", answer: false },
    { question: "스파르타 코딩클럽의 대표는 김범수이다.", answer: false },
    { question: "스파르타 코딩클럽의 부트캠프는 항해99이다.", answer: true },
  ],
  user_answer_list: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "quiz/ADD_ANSWER": {
        console.log(action);
        const new_user_answer_list = [...state.user_answer_list, action.user_answer];

        console.log(new_user_answer_list);
        return {...state, user_answer_list: new_user_answer_list};
    }

    default:
      return state;
  }
}