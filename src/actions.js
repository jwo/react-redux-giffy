export function fetchTheGifs(){
  return (dispatch, getState) => {
    const state = getState()
    const token = state.user.token;
    fetch("http://0.0.0.0:5000/api/me/gifs",{
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then( r => r.json())
    .then( json => {
      dispatch({ type: "GIFS_RECEIVED", gifs: json.gifs})
    })
  }
}
