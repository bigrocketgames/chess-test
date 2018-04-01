const initialState = [
  {id: 1, row: 1, cell: 1, space: ["a",1], value: ""}, {id: 2, row: 1, cell: 2, space: ["a",2], value: ""}, {id: 3, row: 1, cell: 3, space: ["a",3], value: ""}, {id: 4, row: 1, cell: 4, space: ["a",4], value: ""}, {id: 5, row: 1, cell: 5, space: ["a",5], value: ""}, {id: 6, row: 1, cell: 6, space: ["a",6], value: ""}, {id: 7, row: 1, cell: 7, space: ["a",7], value: ""}, {id: 8, row: 1, cell: 8, space: ["a",8], value: ""},

  {id: 9, row: 2, cell: 1, space: ["b",1], value: ""}, {id: 10, row: 2, cell: 2, space: ["b",2], value: ""}, {id: 11, row: 2, cell: 3, space: ["b",3], value: ""}, {id: 12, row: 2, cell: 4, space: ["b",4], value: ""}, {id: 13, row: 2, cell: 5, space: ["b",5], value: ""}, {id: 14, row: 2, cell: 6, space: ["b",6], value: ""}, {id: 15, row: 2, cell: 7, space: ["b",7], value: ""}, {id: 16, row: 2, cell: 8, space: ["b",8], value: ""},

  {id: 17, row: 3, cell: 1, space: ["c",1], value: ""}, {id: 18, row: 3, cell: 2, space: ["c",2], value: ""}, {id: 19, row: 3, cell: 3, space: ["c",3], value: ""}, {id: 20, row: 3, cell: 4, space: ["c",4], value: ""}, {id: 21, row: 3, cell: 5, space: ["c",5], value: ""}, {id: 22, row: 3, cell: 6, space: ["c",6], value: ""}, {id: 23, row: 3, cell: 7, space: ["c",7], value: ""}, {id: 24, row: 3, cell: 8, space: ["c",8], value: ""},

  {id: 25, row: 4, cell: 1, space: ["d",1], value: ""}, {id: 26, row: 4, cell: 2, space: ["d",2], value: ""}, {id: 27, row: 4, cell: 3, space: ["d",3], value: ""}, {id: 28, row: 4, cell: 4, space: ["d",4], value: ""}, {id: 29, row: 4, cell: 5, space: ["d",5], value: ""}, {id: 30, row: 4, cell: 6, space: ["d",6], value: ""}, {id: 31, row: 4, cell: 7, space: ["d",7], value: ""}, {id: 32, row: 4, cell: 8, space: ["d",8], value: ""},

  {id: 33, row: 5, cell: 1, space: ["e",1], value: ""}, {id: 34, row: 5, cell: 2, space: ["e",2], value: ""}, {id: 35, row: 5, cell: 3, space: ["e",3], value: ""}, {id: 36, row: 6, cell: 4, space: ["e",4], value: ""}, {id: 37, row: 6, cell: 5, space: ["e",5], value: ""}, {id: 38, row: 6, cell: 6, space: ["e",6], value: ""}, {id: 39, row: 6, cell: 7, space: ["e",7], value: ""}, {id: 40, row: 6, cell: 8, space: ["e",8], value: ""},

  {id: 41, row: 6, cell: 1, space: ["f",1], value: ""}, {id: 42, row: 6, cell: 2, space: ["f",2], value: ""}, {id: 43, row: 6, cell: 3, space: ["f",3], value: ""}, {id: 44, row: 6, cell: 4, space: ["f",4], value: ""}, {id: 45, row: 6, cell: 5, space: ["f",5], value: ""}, {id: 46, row: 6, cell: 6, space: ["f",6], value: ""}, {id: 47, row: 6, cell: 7, space: ["f",7], value: ""}, {id: 48, row: 6, cell: 8, space: ["f",8], value: ""},

  {id: 49, row: 7, cell: 1, space: ["g",1], value: ""}, {id: 50, row: 7, cell: 2, space: ["g",2], value: ""}, {id: 51, row: 7, cell: 3, space: ["g",3], value: ""}, {id: 52, row: 7, cell: 4, space: ["g",4], value: ""}, {id: 53, row: 7, cell: 5, space: ["g",5], value: ""}, {id: 54, row: 7, cell: 6, space: ["g",6], value: ""}, {id: 55, row: 7, cell: 7, space: ["g",7], value: ""}, {id: 56, row: 7, cell: 8, space: ["g",8], value: ""},

  {id: 57, row: 8, cell: 1, space: ["h",1], value: ""}, {id: 58, row: 8, cell: 2, space: ["h",2], value: ""}, {id: 59, row: 8, cell: 3, space: ["h",3], value: ""}, {id: 60, row: 8, cell: 4, space: ["h",4], value: ""}, {id: 61, row: 8, cell: 5, space: ["h",5], value: ""}, {id: 62, row: 8, cell: 6, space: ["h",6], value: ""}, {id: 63, row: 8, cell: 7, space: ["h",7], value: ""}, {id: 64, row: 8, cell: 8, space: ["h",8], value: ""},
]

export default (state = initialState, action) => {
  switch(action.type) {

    default:
      return state;
  }
}