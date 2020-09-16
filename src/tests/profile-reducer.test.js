const {
  addPost,
  default: profileReducer,
  deletePost,
} = require("../redux/profile-reducer");


let state = {
  posts: [
    { id: "1", message: "First Post", likesCount: 15 },
    { id: "2", message: "Second Post", likesCount: 13 },
    { id: "3", message: "Third Post", likesCount: 12 },
    { id: "4", message: "Four Post", likesCount: 15 },
  ],
};

test("length of posts should be incremented", () => {
  const action = addPost("new post test");
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(5);
});

test("post of test should be `new post test`", () => {
  const action = addPost("new post test");
  let newState = profileReducer(state, action);
  expect(newState.posts[4].message).toBe("new post test");
});

test("length of posts should be decrement", () => {
  const action = deletePost(1);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(3);
});
