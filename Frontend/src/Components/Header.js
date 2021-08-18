import React from "react";
import { Text, Box, Flex, Spacer, Button, Heading } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import Cookies from "js-cookie";

const Header = props => {

    const history = useHistory();

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("adminId");
        history.push("/login");
    };

    return (
        <Box
            borderWidth='1px'
            h="100%"
            paddingY="1%"
            paddingLeft="1.5%"
            bg="gray.200"
        >
            <Flex>
                <Heading fontSize="2xl" color="blue.700">Laxman Fitness Studio</Heading>
                <Spacer/>
                <Button variant="solid" color="blue.700" size="sm" marginRight="2%" 
                    _focus={{outline:"none"}}
                    _hover={{borderWidth:"1px", borderRadius: "5px", bg:"gray.100", borderColor: "gray.100"}}
                    onClick={() => logout()}
                >Logout</Button>
            </Flex>
        </Box>
    )
};

export default Header;