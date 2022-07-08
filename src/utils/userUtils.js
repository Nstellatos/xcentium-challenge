import loginData from "../logindata.csv";
import Papa from "papaparse";

const loginUser = async ({ username, password }) => {
  /*
    there's no backend server to run fs and have access to logindata.csv directly
    instead of putting into the public folder making it accesable to anyone and
    fetching to that now public url. we'll install the npm package file-loader add it to our
    webpack.config.js and use that to be able to read the CSV file.
    We'll use the papaparse npm package to parse our csv into JSON we can consume
  */
  const mockFetchCall = await fetch(loginData);
  const mockResponse = await mockFetchCall.text();

  /*
    paparse returns an array of objects with each objects shape being
   data: {
      Id: string
      Name: string
      Password: string
      Username: string
    } as []
  */
  const { data } = Papa.parse(mockResponse, { header: true });

  /* 
    Now with our array of objects we can iterate through each of them and check
    if any of the users in our array match the input given to us. A linear search
    best case o(1) if the first user in our array matches to the input given to us
    worst case o(n) if the user is last in the array OR not at all
    If there was more data in the csv maybe a binary search would be better??
  */

  for (let user of data) {
    /*
      We can compare both the username in our array and the username input given to us lowercased because
      the username isn't case sensitive. we'll check username first. if that's found THEN we'll check
      if the password matches as well by attempting to login the user with the authorizeUser function
    */
    if (user.Username.toLowerCase() === username.toLowerCase()) {
      //if both of the conditions are true, break out of this loop by returning true(user found)
      return authorizeUser({ userRecord: user, password });
    } else {
      //just keep going if this iteration is not a match
      continue;
    }
  }
  //if none of the conditions match for anything fallback to this returning false(no user found)
  return false;
};

const authorizeUser = ({ userRecord, password }) => {
  /*
    Ideally we wouldn't be comparing plaintext variables here but instead on registration you'd store
    the password hashed and salted (with BCrypt for instance) and then on login this authorize function
    would encrypt the "password" variable input passed in above and compare it to the already exisiting 
    hashed/salted string in the database. This way the server doesn't know the exact true password only
    if the comparison is valid or not.
  */
  if (userRecord.Password === password) {
    /* 
      Doing this means the user can edit the information in local storage and technically sign into
      any account they want/know the username to.
      Preventing this would probably require a backend server handing out JWT tokens or something
      so... the method below is not secure and should really never be used in production c:
    */
    localStorage.setItem("user", userRecord.Username);
    return true;
  }
  return false;
};

const currentUser = () => {
  return localStorage.getItem("user");
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
  authorizeUser,
  isLoggedIn,
  currentUser,
};

export default userUtils;
