import { db } from '../../config/firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// Actions

// 유저 이름을 바꾼다
const ADD_USER_NAME = "rank/ADD_USER_NAME";
// 유저 메시지를 바꾼다
const ADD_USER_MESSAGE = "rank/ADD_USER_MESSAGE";
// 랭킹정보를 추가한다
const ADD_RANK = "rank/ADD_RANK";
// 랭킹정보를 가져온다
const GET_RANK = "rank/GET_RANK";

const initialState = {
  user_name: "",
  user_message: "",
  user_score: "",
  score_text: {
    60: "스파르타코딩과 좀 더 친해져요!",
    80: "우와! 스파르타인 이시네요!",
    100: "스파르타코딩클럽 그자체",
  },
  ranking: [
    { score: 40, name: "양진성", message: "스파르타!" },
  ],
};

// Action Creators
export const addUserName = (user_name) => {
  return { type: ADD_USER_NAME, user_name };
};

export const addUserMessage = (user_message) => {
  return { type: ADD_USER_MESSAGE, user_message };
};

export const addRank = (rank_info) => {
  console.log(rank_info);
  return { type: ADD_RANK, rank_info };
};

export const getRank = (rank_list) => {
  //const query = getDocs(collection(db, 'rank_info'))
  return { type: GET_RANK, rank_list };
};

// middlewares
export const getRankFB = () => {
  return async function (dispatch) {
    const rank_data = await getDocs(collection(db, 'rank_info'));
    console.log(rank_data)
    let rank_list = [];
    rank_data.forEach((doc) => {
      console.log(doc.data());
      rank_list.push({id: doc.id, ...doc.data() });
    });
    console.log(rank_list);
    dispatch(getRank(rank_list));
  }
}

export const addRankFB = () => {
  return async function (addData) {
    
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "rank/ADD_USER_NAME": {
      return { ...state, user_name: action.user_name };
    }

    case "rank/ADD_USER_MESSAGE": {
      return { ...state, user_message: action.user_message };
    }

    case "rank/ADD_RANK": {
      return { ...state, ranking: [...state.ranking, action.rank_info] };
    }

    case "rank/GET_RANK": {
      return { ...state, ranking: action.rank_list };
    }

    default:
      return state;
  }
}