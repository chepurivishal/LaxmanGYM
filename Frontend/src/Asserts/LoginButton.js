import React from "react";
import { Box } from "@chakra-ui/react";

const LoginButton = props => {
    return (
        <Box
            as="loginbutton"
            height={props.height || "32px"}
            width={props.width || "100%"}
            borderRadius="5px"
            textAlign="center"
            alignItems="center"
            color="#3399FF"
            borderColor="#3399FF"
            borderWidth="1.2px"
            fontWeight="semibold"
            _active={{
                transform: "scale(0.98)"
            }}
            _hover={{
                bg:"#affsad"
            }}

        >{props.text}</Box>
    )
};

export default LoginButton;