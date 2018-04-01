export default (state = [], action) => {
  switch(action.type) {
    case 'addMove':
      const move = Object.assign({}, action.move);
      return [
        ...state,
        move
      ]

    default:
      return state;
  }
}