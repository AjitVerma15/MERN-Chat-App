import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { PasswordField } from "../FormFields/PasswordField";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import constants from "../../constants";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const submitHandler = () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    axios
      .post(
        constants.RESOURCES.login,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          const data = response.data;
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          navigator("/chats");
        } else {
          toast({
            title: response.error,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        toast({
          title: error.response ? error?.response?.error : error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      });
  };

  return (
    <VStack spacing="10px">
      <FormControl id="login-email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <PasswordField
        placeholder="Password"
        id="login-password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        show={show}
        handleClick={handleClick}
      />
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
