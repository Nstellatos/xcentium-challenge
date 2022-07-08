import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Center,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import userUtils from "../utils/userUtils";
import { useState } from "react";
const Login = () => {
  const [userFound, setUserFound] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, password } = data;
    reset();
    setUserFound(await userUtils.loginUser({ username, password }));
  };
  /*
    Using the react-hook-form package here because it's faster and if I used the useState react hook along
    with updating state on every keypress to create a controlled form. State would cause
    a re-render on every keypress. Probably doesn't matter with only 2 inputs but on a larger scale
    it could cause some slowdowns.
  */
  const renderErrorMessages = () => {
    //use nanoid package to generate uuid for key so each FormErrorMessage rendered to the dom has a unique key
    return Object.values(errors).map((error) => (
      <FormErrorMessage key={nanoid()}>
        <Text fontSize="xs">{error.message}</Text>
      </FormErrorMessage>
    ));
  };

  return (
    <Center h="100vh">
      <Box w="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.username || errors.password}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              {...register("username", {
                required: "Please enter a valid username",
              })}
            />

            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password_textbox"
              type="password"
              {...register("password", {
                required: "Please enter a valid password",
              })}
            />
            <Button mt={5} colorScheme="green" type="submit">
              Login
            </Button>
            <Center>
              <div
                className="error_container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "1rem",
                }}
              >
                <Text
                  color="red.500"
                  hidden={userFound == undefined || null ? true : userFound}
                >
                  User Not Found
                </Text>
                {errors ? renderErrorMessages() : ""}
              </div>
            </Center>
          </FormControl>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
