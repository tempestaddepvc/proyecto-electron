import dispatcher from "../dispatcher";



export function logOut() {
  dispatcher.dispatch({
    type: "LOG_OUT",
  });
}

export function logIn() {

  dispatcher.dispatch({type: "LOG_IN"});

    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: });

}
