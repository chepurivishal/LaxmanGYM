import React, {useEffect, useState} from "react";
import { CloseButton, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Text, VStack, Box, Flex, Heading, Spacer, Button, InputGroup, InputLeftElement, Input, Grid, GridItem, Wrap, WrapItem, Avatar, Center, Divider, HStack, Checkbox, Radio, RadioGroup, Switch } from "@chakra-ui/react";
import { BsFillPlusCircleFill, BsSearch } from "react-icons/bs";
import {useSelector, useDispatch} from "react-redux"; 
import CreateUser from "./CreateUser";
import { toggleAddUserDrawer, appendUsers, toggleUpdateUserDrawer, loadUsers } from "../ReduxStore/Actions";
import Cookies from "js-cookie";
import APIS from "../APIS";
const utils = require("../Utils");
const apis = require("../APIS");
const _ = require("lodash");

const User = props => {
    const users = useSelector(state => state.users.users);
    const addUser = useSelector(state => state.toggler.addUserDrawer);
    const updateUser = useSelector(state => state.toggler.updateUserDrawer);
    const [expiringUsers, setExpiringUsers] = useState([]);
    const [birthdayUsers, setBirthdayUsers] = useState([]);
    let [updateUserIndex, setUpdateUserIndex] = useState();
    const [type, setType] = useState("expire");

    const dispatch = useDispatch();

    useEffect(() => {
        getUsers();
        getExpiringUsers();
        getBirthdayUsers();
    }, []);

    const getUsers = () => {
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        APIS.getUsers(adminId, token)
        .then(response => {
            dispatch(loadUsers(response));
        });
    };

    const getExpiringUsers = () => {
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        APIS.getExpiringUsers(adminId, token)
        .then(response => {
            setExpiringUsers(response);
        });
    };

    const getBirthdayUsers = () => {
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        APIS.getBirthdayUsers(adminId, token)
        .then(response => {
            setBirthdayUsers(response);
        })
    };

    const calculateExpiry = (endDate) => {
        var today = new Date().getTime();
        var endDate = new Date(endDate).getTime();
        var diff = parseInt((endDate - today) / (86400 * 1000), 10);
        if(diff === 1) return `${diff} day`;
        else return `${diff} days`;
    }

    const debounce = (fn, delay) => {
        let timeout;
        return () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                fn();
            }, delay);
        }
    };

    const searchUser = () => {
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        let searchString = document.getElementById("search").value;
        if(searchString.length) {
            APIS.searchUser(adminId, token, searchString)
            .then(res => {
                dispatch(loadUsers(res));
            })
        } else {
            getUsers();
        }
    };

    const sendNotification = () => {
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        const _users = type === "expire"? expiringUsers: birthdayUsers;
        const _type = type === "expire"? "1": "2";
        let body = {
            type: _type,
            users: _.map(_users, expiringUser => {
                return expiringUser._id
            })
        };
        APIS.sendNotification(adminId, token, body);
    };

    return (
        <React.Fragment>
             {
                (() => {
                    if(addUser) {
                        return (
                            <Drawer isOpen={addUser} size='xl'>
                                <DrawerOverlay/>
                                <DrawerContent>
                                    <DrawerHeader size="lg" borderBottomWidth="1px" color="blue.700">
                                        <Flex>
                                            New User
                                        <Spacer/>
                                        <CloseButton _focus={{ outline: "none" }} onClick={() => dispatch(toggleAddUserDrawer())} />
                                        </Flex>
                                    </DrawerHeader>
                                    <DrawerBody>
                                        <CreateUser/>
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        )
                    } else if(updateUser) {
                        return (
                            <Drawer isOpen={updateUser} size='xl'>
                                <DrawerOverlay/>
                                <DrawerContent>
                                    <DrawerHeader size="lg" borderBottomWidth="1px" color="blue.700">
                                        <Flex>
                                            Update User
                                        <Spacer/>
                                        <CloseButton _focus={{ outline: "none" }} onClick={() => dispatch(toggleUpdateUserDrawer())} />
                                        </Flex>
                                    </DrawerHeader>
                                    <DrawerBody>
                                        <CreateUser user={users[updateUserIndex]}/>
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        )  
                    }
                })()
            }
            <VStack align="stretch" spacing={4}>
                <Box h="5%" padding="1%" paddingLeft="2%" bg="white" borderBottomColor="gray.100" borderBottomWidth="1px">
                    <Flex>
                        <Heading color="blue.700" fontSize="xl">Users</Heading>
                        <InputGroup 
                                borderRadius="5px"
                                size="sm"
                                w="30%"
                                ml="2%"
                                _focus={{outline: "none"}}
                        >
                            <InputLeftElement
                                pointerEvents="none"
                                children={<BsSearch color="blue.700" size=""/>}
                            />
                            <Input
                                variant="filled"
                                size="sm"
                                color="blue.700"
                                _focus={{outline: "none"}}
                                borderRadius="5px"
                                placeholder="search users"
                                id="search"
                                onChange={debounce(() => searchUser(), 1000)}
                            />
                        </InputGroup>
                        <Spacer/>
                        <Button rightIcon={<BsFillPlusCircleFill/>} color="blue.700" variant="solid" size="sm"  marginRight="3%" _focus={{outline:"none"}} onClick={() => dispatch(toggleAddUserDrawer())}>
                            <Text>
                                Add
                            </Text>
                        </Button>
                    </Flex>
                </Box>
            
                <Box h="95%" paddingX="2%">
                    <Grid templateColumns="repeat(12, 1fr)" templateRows="repeat(12, 1fr)" h="77vh">
                        <GridItem colSpan={8} rowSpan={12} overflowY="scroll" borderWidth="1px" borderRadius="3px">
                            <Wrap padding="1%">
                                {
                                    (users && users.length) ? 
                                    users.map((user, index) => {
                                        if(user) {  
                                            return (
                                                <WrapItem h="100%" w="23.9%">
                                                    <Box w="100%" borderWidth="1px" borderColor="gray.100" borderRadius="5px" _hover={{cursor:"pointer"}} _hover={{cursor:"pointer"}} bg="gray.100" 
                                                    onClick={() => {
                                                        setUpdateUserIndex(index);
                                                        dispatch(toggleUpdateUserDrawer())
                                                    }}>
                                                        <Center paddingY="10%">
                                                            <Avatar size="2xl" src={user.profilePic} />
                                                        </Center>
                                                        <Box paddingY="5%">
                                                            <Center>
                                                                <Heading size="sm" color="blue.700">{user.name} ({user.age}/{user.gender === "male" ? "M" : "F"})</Heading>
                                                            </Center>
                                                        </Box>
                                                    </Box>
                                                </WrapItem>   
                                            )
                                        }
                                    })
                                    :
                                    <React.Fragment/>
                                }
                            </Wrap>
                        </GridItem>

                        <GridItem colSpan={4} rowSpan={12} borderWidth="1px" borderRadius="3px" ml={4}>
                            <Flex bg="gray.100" width="100%" padding="3" borderRadius="2px">
                                <Switch value={type} _focus={{outline: "none"}} onChange={() => {
                                    if(type === "expire") setType("birthday")
                                    else setType("expire")
                                }}/>
                                <Spacer/>
                                <Heading fontSize="md" color="blue.700">{type==="expire" ? "Expiring Subscriptions" : "Birthday Wishes"}</Heading>
                                <Spacer/>
                                <Button size="sm" color="blue.700" variant="solid" _focus={{outline: "none"}} borderWidth="1px" onClick={() => sendNotification()}>
                                    Notify
                                </Button>
                            </Flex>
                            {
                                type === "expire"?
                                <VStack padding="4%" overflowY="scroll" h="71vh">
                                    {
                                        expiringUsers.map(user => {
                                            return (
                                                <Box h="12vh" w="100%" borderWidth="1px" borderColor="gray.100" borderRadius="5px" padding="1.5vh">
                                                    <HStack>
                                                        <Avatar src={user.profilePic}/>       
                                                        <Heading color="blue.700" fontSize="md">{user.name}</Heading>
                                                    </HStack>
                                                    <Text color="tomato" fontSize="xs">Subscription Expires in {calculateExpiry(user.endDate)} Please Notify</Text>
                                                </Box>
                                            )
                                        })
                                    }
                                </VStack>
                                :
                                <VStack padding="4%" overflowY="scroll" h="71vh">
                                    {
                                        birthdayUsers.map(user => {
                                            return (
                                                <Box h="12vh" w="100%" borderWidth="1px" borderColor="gray.100" borderRadius="5px" padding="1.5vh">
                                                    <HStack>
                                                        <Avatar src={user.profilePic}/> 
                                                        <Heading color="blue.700" fontSize="md">{user.name}</Heading>
                                                    </HStack>
                                                </Box>
                                            )
                                        })
                                    }
                                </VStack>

                            }
                        </GridItem>
                    </Grid>
                </Box>
            </VStack>
        </React.Fragment>
    )
};

export default User;