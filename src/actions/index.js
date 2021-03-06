import axios from 'axios';

export const GET_NOTES = 'GET_NOTES';
export const GET_NOTE = 'GET_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ERROR = 'ERROR';
export const LOADING = 'LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const GET_USER = 'GET_USER';

const herokuURL = `https://fathomless-bastion-61109.herokuapp.com`;
const localURL = `http://localhost:5000`

export const getNotes = () => async dispatch => {
    try {
        dispatch({ type: LOADING })
        const {data} = await axios.get(`${herokuURL}/notes`)
        dispatch({ type: GET_NOTES, payload: data })
        dispatch({ type: HIDE_LOADING })
    } catch (error) {
        dispatch({ type: ERROR, error})
    }
}

export const createNote = (note) => {
    return (dispatch) => {
        axios.post(`${herokuURL}/notes`, note)
        .then((response) => {
            dispatch({
                type : CREATE_NOTE,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
export const updateNote = (note, id) => {
    return (dispatch) => {
        axios.put(`${herokuURL}/notes/update/${id}`, note)
        .then(() => {
            dispatch({
                type : UPDATE_NOTE,
            })
            dispatch(getNotes())
        })
        .catch((error) => {
            console.log(error)
        })
    }
} 


export const deleteNote = (id) => {
    return (dispatch) => {
        axios.delete(`${herokuURL}/notes/delete/${id}`)
        .then(() => {
            dispatch({
                type : DELETE_NOTE,
            })
            dispatch(getNotes())
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
export const signUp = (user) => {
    return (dispatch) => {
        axios.post(`${herokuURL}/user/register`, user)
        .then((response) => {
            dispatch({
                type : SIGNUP,
                payload: response.data.user
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
export const login = (user) => {
    return (dispatch) => {
        axios.put(`${herokuURL}/user/login`, user)
        .then((response) => {
            console.log(response)
            const id = response.data.user._id
            const token = response.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
            dispatch({
                type : LOGIN,
                payload: response.data.user
            })

        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export const getUser = () => async dispatch => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    try {
        dispatch({ type: LOADING })
        const {data} = await axios.get(`${herokuURL}/user/${id}`, {headers: {Authorization: token}})
        dispatch({ type: GET_USER, payload: data })
        dispatch({ type: HIDE_LOADING })
    } catch (error) {
        dispatch({ type: ERROR, error})
    }
}

export const error = () => {
    return (dispatch) => {
        
    }
}