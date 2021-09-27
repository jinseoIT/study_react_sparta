import { db } from '../../config/firebase';
import { collection, addDoc, getDocs, getDoc } from 'firebase/firestore'; 
/* Action Types */
const ADD_WORD = 'ADD_WORD';
const GET_WORD = 'GET_WORD';

const initialState = {
  wordList: []
}

/*  middleWares */
export const addWordFB = (wordInfo) => {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, 'dictionary'), wordInfo);
    console.log('docRef'.docRef);
    const newWord = await getDoc(docRef);
    console.log('newword', newWord);
    dispatch(addWord(wordInfo))
  }
}
export const getWordsFB = () => {
  return async (dispatch) => {
    const word_data = await getDocs(collection(db, 'dictionary'));
    let wordList = [];
    word_data.forEach((doc) => {
      console.log(doc.data());
      wordList.push({ id: doc.id, ...doc.data() });
    });
    console.log(wordList);
    dispatch(getWord(wordList)) 
  }
}


/* Action Creators */
export const addWord = (wordInfo) => {
  return {type : ADD_WORD, wordInfo}
}
export const getWord = (wordList) => {
  return {type : GET_WORD, wordList}
}


/* Reducer */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "ADD_WORD": {
      return {...state, wordList: [...state.wordList, action.wordInfo]}
    }
    case "GET_WORD": {
      return {...state, wordList: action.wordList}
    }
    default:
      return state;
  }
}
