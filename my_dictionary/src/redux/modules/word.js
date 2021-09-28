import { db } from '../../config/firebase';
import { doc, query, updateDoc, collection, addDoc, getDocs, getDoc, deleteDoc, orderBy } from 'firebase/firestore';
import getNowTimeStamp from '../../config/dateCalc';
/* Action Types */
const ADD_WORD = 'ADD_WORD';
const GET_WORD = 'GET_WORD';
const UPDATE_WORD = 'UPDATE_WORD';
const DELETE_WORD = 'DELETE_WORD';
const IS_LOADED = 'IS_LOADED';

const initialState = {
  is_loaded: true,
  wordList: []
}

/*  middleWares */
export const addWordFB = (wordInfo) => {
  return async (dispatch) => {
    wordInfo.nowDt = getNowTimeStamp();
    const docRef = await addDoc(collection(db, 'dictionary'), wordInfo);
    const newWord = await getDoc(docRef);
    const newWordInfo = {
      id: newWord.id,
      updateLock: true,
      ...wordInfo
    }
    dispatch(addWord(newWordInfo))
  }
}
export const getWordsFB = () => {
  return async (dispatch) => {
    const wordRef = collection(db, 'dictionary');
    const q = query(wordRef, orderBy('nowDt', 'desc'));
    const word_data = await getDocs(q);
    let wordList = [];
    word_data.forEach((doc) => {
      wordList.push({ id: doc.id, updateLock: true, ...doc.data() });
    });
    dispatch(getWord(wordList)) 
  }
}
export const updateWordFB = (wordInfo) => {
  return async (dispatch) => {
    const docRef = doc(db, 'dictionary', wordInfo.id);
    await updateDoc(docRef, wordInfo)
    dispatch(updateWord(wordInfo));
  }
}

export const deleteWordFB = (id) => {
  return async (dispatch) => {
    const docRef = doc(db, 'dictionary', id);
    await deleteDoc(docRef);
    dispatch(deleteWord(id));
  }
}



/* Action Creators */
export const addWord = (wordInfo) => {
  return {type : ADD_WORD, wordInfo}
}
export const getWord = (wordList) => {
  return {type : GET_WORD, wordList}
}
export const updateWord = (wordInfo) => {
  return {type: UPDATE_WORD, wordInfo}
}
export const deleteWord = (id) => {
  return {type: DELETE_WORD, id}
}
export const isLoaded = () => {
  return {type: IS_LOADED}
}


/* Reducer */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "ADD_WORD": {
      return {...state, wordList:[action.wordInfo, ...state.wordList], is_loaded: true}
    }
    case "GET_WORD": {
      return {...state, wordList: action.wordList, is_loaded: true}
    }
    case "UPDATE_WORD": {
      const newWordList = state.wordList.map(item => {
        if (item.id !== action.wordInfo.id) {
          return item
        }
        return {
          ...item,
          ...action.wordInfo,
          is_loaded: true
        }
      })
      return {...state, wordList: newWordList, is_loaded: true}
    }
    case "DELETE_WORD": {
      const newWordList = state.wordList.filter(item => item.id !== action.id)
      return {...state, wordList: newWordList, is_loaded: true}
    }
    case "IS_LOADED": {
      return {...state, is_loaded: false}
    }
    default:
      return state;
  }
}
