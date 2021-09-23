const ADD_ANSWER = 'quiz/ADD_ANSWER';
const DELETE_ANSWER = 'quiz/DELETE_ANSWER';

export const addAnswer = (user_answer) => {
  return { type: ADD_ANSWER, user_answer };
};

export const resetAnswer = () => {
  return { type: DELETE_ANSWER };
}

const name = "스파르타 코딩클럽";

const initialState = {
  quiz_list: [
    { question: "스파르타 코딩클럽 사이트는 React.js로 만들어졌다.", answer: false },
    { question: "스파르타 코딩클럽의 대표는 김범수이다.", answer: false },
    { question: "스파르타 코딩클럽의 부트캠프는 항해99이다.", answer: true },
    { question: "스파르타 코딩클럽 항해99는 현재 4기를 모집중이다.", answer: true },
    { question: "스파르타 코딩클럽의 부트캠프는 소수정예이다", answer: false },
  ],
  user_answer_list: [],
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'quiz/ADD_ANSWER': {
      const new_user_answer_list = [...state.user_answer_list, action.user_answer];
      
      return { ...state, user_answer_list: new_user_answer_list, name : name };
    }
    case 'quiz/DELETE_ANSWER': {
      return { ...state, user_answer_list: [] };
    }
    
    default:
      return state;
  }
}