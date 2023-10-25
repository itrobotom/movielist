


//задаем типы экшенов через константы чтобы при вводе не ошибиться
const infoUser = {
    ADD_TOKEN: 'ADD_TOKEN',
    DELETE_TOKEN: 'DELETE_TOKEN'
}

//создаем объект пользователя, чтобы потом можно было не только сохранять и изменять информацию о токене, но и другую, которая в дальнейшем появится
const defaultUserInformation = {
    tokenAutorization: '', 
}
//экшн в виде функции, в которую удобно отправить параметр (не обязательно создавать с аргументом)
function addToken(token){
    return {type: infoUser.ADD_TOKEN, payload: token}
}
function deleteToken() { //вызывать будет без аргументов дабы передать пустую строчку для отчистки токена в сторе
    return {type: infoUser.DELETE_TOKEN, payload: ""}
}
const reducerUser = (state = defaultUserInformation, action) => {
    switch(action.type) {
        case infoUser.ADD_TOKEN:
            return{ ...state, tokenAutorization: action.payload}
        case infoUser.DELETE_TOKEN:
            return{...state, tokenAutorization: action.payload}
        default:
            return state;
    }
}

export {addToken, deleteToken, reducerUser}