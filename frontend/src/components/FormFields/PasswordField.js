import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const PasswordField = (props) => {
  return (
    <FormControl id={props.id} isRequired>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup size="md">
        <Input
          type={props.show ? "text" : "password"}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(e)}
        />
        <InputRightElement width="4.5rem">
          {props.show ? (
            <ViewIcon h="1.75rem" size="sm" onClick={props.handleClick} />
          ) : (
            <ViewOffIcon h="1.75rem" size="sm" onClick={props.handleClick} />
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
