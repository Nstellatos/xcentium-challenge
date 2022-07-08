import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userUtils from "./utils/userUtils";
import {
  Center,
  Wrap,
  WrapItem,
  Avatar,
  AvatarBadge,
  Text,
  Image,
  Button,
  Box,
  useColorMode,
} from "@chakra-ui/react";
function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const username = userUtils.currentUser();
  useEffect(() => {
    //Check local storage for user if it doesn't exist redirect to /login endpoind
    if (!userUtils.isLoggedIn()) {
      navigate("/login");
    }
  }, [userUtils.isLoggedIn]);
  return (
    <>
      <Image
        src="https://img.freepik.com/premium-vector/web-development-coding-programming-futuristic-banner-computer-code-laptop_3482-5572.jpg?w=1800"
        objectFit={"cover"}
        w={"100vw"}
        h={"25rem"}
        position="fixed"
        zIndex={"-1"}
      />
      <Box textAlign={"right"} p="5">
        <Button
          colorScheme={"red"}
          onClick={() => {
            userUtils.logoutUser();
            navigate("/login");
          }}
        >
          Logout
        </Button>
        <Button
          ml={5}
          onClick={() => {
            {
              toggleColorMode();
            }
          }}
        >
          {colorMode === "dark" ? "Light" : "Dark"}
        </Button>
      </Box>
      <Center h="100vh">
        <Wrap>
          <WrapItem>
            <Avatar
              name={username}
              src="https://i.ibb.co/gTrHWb8/278424486-1067537770786983-1275286509633203675-n.jpg"
              size={"2xl"}
            >
              <AvatarBadge boxSize=".8em" bg="green.500" />
            </Avatar>
          </WrapItem>
        </Wrap>
        {username ? (
          <Text fontSize={"xl"}>WELCOME {username.toUpperCase()}</Text>
        ) : (
          ""
        )}
      </Center>
    </>
  );
}

export default App;
