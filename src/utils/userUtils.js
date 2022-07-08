const authorizeUser = ({ username, password }) => {};

const loginUser = ({ username, password }) => {
  console.log(`login user ${username}, ${password}`);
};

const isLoggedIn = () => {
  //Coerce and return localstorage check into boolean value
  return !!localStorage.getItem("user");
};

const logoutUser = () => {
  localStorage.clear();
};
const userUtils = {
  loginUser,
  logoutUser,
};

export default userUtils;
