import { MOVE_SUCCESS, RESET_BOARD_SUCCESS, REWIND_BOARD_SUCCESS, UPDATE_CASTLING } from './actions';

const initialState = { board: [
  {id: 1, row: 1, cell: 1, space: "a8", value: "rookblack", color: "light", piece: "Rook", pieceColor: "Black"}, 
  {id: 2, row: 1, cell: 2, space: "b8", value: "knightblack", color: "dark", piece: "Knight", pieceColor: "Black"}, 
  {id: 3, row: 1, cell: 3, space: "c8", value: "bishopblack", color: "light", piece: "Bishop", pieceColor: "Black"}, 
  {id: 4, row: 1, cell: 4, space: "d8", value: "queenblack", color: "dark", piece: "Queen", pieceColor: "Black"}, 
  {id: 5, row: 1, cell: 5, space: "e8", value: "kingblack", color: "light", piece: "King", pieceColor: "Black"}, 
  {id: 6, row: 1, cell: 6, space: "f8", value: "bishopblack", color: "dark", piece: "Bishop", pieceColor: "Black"}, 
  {id: 7, row: 1, cell: 7, space: "g8", value: "knightblack", color: "light", piece: "Knight", pieceColor: "Black"}, 
  {id: 8, row: 1, cell: 8, space: "h8", value: "rookblack", color: "dark", piece: "Rook", pieceColor: "Black"},

  {id: 9, row: 2, cell: 1, space: "a7", value: "pawnblack", color: "dark", piece: "Pawn", pieceColor: "Black"}, 
  {id: 10, row: 2, cell: 2, space: "b7", value: "pawnblack", color: "light", piece: "Pawn", pieceColor: "Black"}, 
  {id: 11, row: 2, cell: 3, space: "c7", value: "pawnblack", color: "dark", piece: "Pawn", pieceColor: "Black"}, 
  {id: 12, row: 2, cell: 4, space: "d7", value: "pawnblack", color: "light", piece: "Pawn", pieceColor: "Black"}, 
  {id: 13, row: 2, cell: 5, space: "e7", value: "pawnblack", color: "dark", piece: "Pawn", pieceColor: "Black"}, 
  {id: 14, row: 2, cell: 6, space: "f7", value: "pawnblack", color: "light", piece: "Pawn", pieceColor: "Black"}, 
  {id: 15, row: 2, cell: 7, space: "g7", value: "pawnblack", color: "dark", piece: "Pawn", pieceColor: "Black"}, 
  {id: 16, row: 2, cell: 8, space: "h7", value: "pawnblack", color: "light", piece: "Pawn", pieceColor: "Black"},

  {id: 17, row: 3, cell: 1, space: "a6", value: "", color: "light", piece: "", pieceColor: ""}, {id: 18, row: 3, cell: 2, space: "b6", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 19, row: 3, cell: 3, space: "c6", value: "", color: "light", piece: "", pieceColor: ""}, {id: 20, row: 3, cell: 4, space: "d6", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 21, row: 3, cell: 5, space: "e6", value: "", color: "light", piece: "", pieceColor: ""}, {id:22, row: 3, cell: 6, space: "f6", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 23, row: 3, cell: 7, space: "g6", value: "", color: "light", piece: "", pieceColor: ""}, {id: 24, row: 3, cell: 8, space: "h6", value: "", color: "dark", piece: "", pieceColor: ""},

  {id: 25, row: 4, cell: 1, space: "a5", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 26, row: 4, cell: 2, space: "b5", value: "", color: "light", piece: "", pieceColor: ""}, {id: 27, row: 4, cell: 3, space: "c5", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 28, row: 4, cell: 4, space: "d5", value: "", color: "light", piece: "", pieceColor: ""}, {id: 29, row: 4, cell: 5, space: "e5", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 30, row: 4, cell: 6, space: "f5", value: "", color: "light", piece: "", pieceColor: ""}, {id: 31, row: 4, cell: 7, space: "g5", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 32, row: 4, cell: 8, space: "h5", value: "", color: "light", piece: "", pieceColor: ""},

  {id: 33, row: 5, cell: 1, space: "a4", value: "", color: "light", piece: "", pieceColor: ""}, {id: 34, row: 5, cell: 2, space: "b4", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 35, row: 5, cell: 3, space: "c4", value: "", color: "light", piece: "", pieceColor: ""}, {id: 36, row: 5, cell: 4, space: "d4", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 37, row: 5, cell: 5, space: "e4", value: "", color: "light", piece: "", pieceColor: ""}, {id: 38, row: 5, cell: 6, space: "f4", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 39, row: 5, cell: 7, space: "g4", value: "", color: "light", piece: "", pieceColor: ""}, {id: 40, row: 5, cell: 8, space: "h4", value: "", color: "dark", piece: "", pieceColor: ""},

  {id: 41, row: 6, cell: 1, space: "a3", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 42, row: 6, cell: 2, space: "b3", value: "", color: "light", piece: "", pieceColor: ""}, {id: 43, row: 6, cell: 3, space: "c3", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 44, row: 6, cell: 4, space: "d3", value: "", color: "light", piece: "", pieceColor: ""}, {id: 45, row: 6, cell: 5, space: "e3", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 46, row: 6, cell: 6, space: "f3", value: "", color: "light", piece: "", pieceColor: ""}, {id: 47, row: 6, cell: 7, space: "g3", value: "", color: "dark", piece: "", pieceColor: ""}, {id: 48, row: 6, cell: 8, space: "h3", value: "", color: "light", piece: "", pieceColor: ""},

  {id: 49, row: 7, cell: 1, space: "a2", value: "pawnwhite", color: "light", piece: "Pawn", pieceColor: "White"}, 
  {id: 50, row: 7, cell: 2, space: "b2", value: "pawnwhite", color: "dark", piece: "Pawn", pieceColor: "White"}, 
  {id: 51, row: 7, cell: 3, space: "c2", value: "pawnwhite", color: "light", piece: "Pawn", pieceColor: "White"}, 
  {id: 52, row: 7, cell: 4, space: "d2", value: "pawnwhite", color: "dark", piece: "Pawn", pieceColor: "White"}, 
  {id: 53, row: 7, cell: 5, space: "e2", value: "pawnwhite", color: "light", piece: "Pawn", pieceColor: "White"}, 
  {id: 54, row: 7, cell: 6, space: "f2", value: "pawnwhite", color: "dark", piece: "Pawn", pieceColor: "White"}, 
  {id: 55, row: 7, cell: 7, space: "g2", value: "pawnwhite", color: "light", piece: "Pawn", pieceColor: "White"}, 
  {id: 56, row: 7, cell: 8, space: "h2", value: "pawnwhite", color: "dark", piece: "Pawn", pieceColor: "White"},

  {id: 57, row: 8, cell: 1, space: "a1", value: "rookwhite", color: "dark", piece: "Rook", pieceColor: "White"}, 
  {id: 58, row: 8, cell: 2, space: "b1", value: "knightwhite", color: "light", piece: "Knight", pieceColor: "White"}, 
  {id: 59, row: 8, cell: 3, space: "c1", value: "bishopwhite", color: "dark", piece: "Bishop", pieceColor: "White"}, 
  {id: 60, row: 8, cell: 4, space: "d1", value: "queenwhite", color: "light", piece: "Queen", pieceColor: "White"}, 
  {id: 61, row: 8, cell: 5, space: "e1", value: "kingwhite", color: "dark", piece: "King", pieceColor: "White"}, 
  {id: 62, row: 8, cell: 6, space: "f1", value: "bishopwhite", color: "light", piece: "Bishop", pieceColor: "White"}, 
  {id: 63, row: 8, cell: 7, space: "g1", value: "knightwhite", color: "dark", piece: "Knight", pieceColor: "White"}, 
  {id: 64, row: 8, cell: 8, space: "h1", value: "rookwhite", color: "light", piece: "Rook", pieceColor: "White"},
], turnColor: "White", castling: {canWhiteCastleRight: true, canWhiteCastleLeft: true, canBlackCastleRight: true, canBlackCastleLeft: true}, enPassant: {status: false, cell: null, row: null}}

export default (state = initialState, action) => {
  switch(action.type) {
    case MOVE_SUCCESS:
      // determine who's turn is next
      const nextColor = state.turnColor === "White" ? "Black" : "White"

      return {
        ...state,
        board: action.board,
        turnColor: nextColor,
        enPassant: action.enPassant
      }

    case UPDATE_CASTLING:
      return {
        ...state,
        castling: action.castling
      }

    case RESET_BOARD_SUCCESS:
      return initialState;

    case REWIND_BOARD_SUCCESS:
      return action.board;

    default:
      return state;
  }
}