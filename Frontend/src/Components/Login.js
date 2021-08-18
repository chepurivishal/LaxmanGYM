import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from "js-cookie";
import { CloseButton, Center, Stack, Input, Button, Box, Text, Wrap, WrapItem, Image, SimpleGrid, Divider, Grid, GridItem, InputGroup, InputRightElement, Alert, AlertIcon } from '@chakra-ui/react';
import logo from "../Images/logo.jpeg";

import APIS from "../APIS";


const Login = props => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(Cookies.get("token")) history.push("/home");
    }, []);

    const login = () => {
        setLoginLoading(true);
        APIS.login({username, password})
        .then(response => {
            if(response && response.status === 200) {
                setIsLoginFailed(false);
                setLoginLoading(false);
                Cookies.set("token", JSON.stringify(response.data.token), {expires: 1});
                Cookies.set("adminId", JSON.stringify(response.data.admin._id));
                history.push("/home");
            } else {
                setIsLoginFailed(true);
                setLoginLoading(false);
            }
        })
    };

    const handleChange = (event, id) => {
        document.getElementById(id).value = event.target.value;
        switch(id) {
            case "username":
                setUserName(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
        }
    };

    return (
        <Box marginX="10%" marginY="5%" padding="5%">
            <Grid templateColumns="repeat(10, 1fr)" templateRows="repeat(1, 1fr)">
                    <GridItem colSpan={6}>
                        {/* <Text fontSize="6xl">Laxman Fitness Studio</Text> */}
                        <Image src={logo} h="50vh"/>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Divider orientation="vertical"/>
                    </GridItem>
                    <GridItem colSpan={3} paddingY="20%">
                        <SimpleGrid columns={1} spacing="10%">
                            <Text fontSize="4xl" color="blue.700">Login</Text>
                            <Input placeholder="username" size="sm" _focus={{outline:"none"}} variant="outline"
                                onChange={event => handleChange(event, "username")}
                                id="username"
                                value={username}/>
                            <InputGroup size="sm">
                                <Input placeholder="password" size="sm" _focus={{outline:"none"}} variant="outline"
                                    onChange={event => handleChange(event, "password")}
                                    id="password"
                                    value={password}
                                    type={showPass ? "text" : "password"}/>
                                <InputRightElement width="20%">
                                    <Button size="sm" h="60%" onClick={() => setShowPass(!showPass)} _focus={{outline: "none"}}>
                                        {showPass ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {
                                loginLoading ?
                                <Button
                                    isLoading 
                                    size="sm" 
                                    variant="solid" 
                                    colorScheme="blue" 
                                    borderRadius="3px"
                                />
                                :
                                <Button 
                                    size="sm" 
                                    variant="solid" 
                                    color="blue.700" 
                                    borderRadius="3px"
                                    _focus={{outline:"none"}}
                                    onClick={() => login()}
                                >Login</Button>
                            }

                            {
                                (() => {
                                    if(isLoginFailed) {
                                        return (
                                            <Alert status="error" borderRadius="2px">
                                                <AlertIcon/>
                                                Password or Username Incorrect!
                                                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setIsLoginFailed(false)} _focus={{outline: "none"}}/>
                                            </Alert>
                                        );
                                    }
                                })()
                            }
                        </SimpleGrid>
                    </GridItem>
            </Grid>
        </Box>
    );
};

export default Login;