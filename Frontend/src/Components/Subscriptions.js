import React, { useEffect, useState } from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, Box, AccordionPanel, Heading, VStack, Flex, Spacer, Button, Text, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Divider, Grid, GridItem, HStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import {BsArrowUp, BsFillPlusCircleFill} from "react-icons/bs";
import CreateSubscription from "./CreateSubscription";
import UpdateSubscription from "./UpdateSubscription";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddSubDrawer, addSubscription, loadSubscriptions } from "../ReduxStore/Actions";
import APIS from "../APIS";

const Subscriptions = props => {
    const dispatch = useDispatch();

    const addSubscription = useSelector(state => state.toggler.addSubscriptionDrawer);
    const subscriptions = useSelector(state => state.subscriptions.subscriptions)

    const [quote, setQuote] = useState({
        "text": "Happiness is just the state of mind it has nothing to do with External world!!",
        "author": " Lord Krishna"
    });

    useEffect(() => {
        getSubscriptions();
    }, []);

    useEffect(() => {
        APIS.getQuote()
        .then(res => {
            if(res) {
                setQuote(res);
            }
        })
    }, [])

    const getSubscriptions = () => {
        const token = JSON.parse(Cookies.get("token"));
        const adminId = JSON.parse(Cookies.get("adminId"));
        APIS.getSubscriptions(adminId, token)
        .then(response => {
            dispatch(loadSubscriptions(response));
    });
    };

    return (
        <React.Fragment>
            {
                (() => {
                    if(addSubscription) {
                        return (
                            <Drawer isOpen={addSubscription} size='lg'>
                                <DrawerOverlay/>
                                <DrawerContent>
                                    <DrawerHeader size="lg" borderBottomWidth="1px" color="blue.700">
                                        New Subscription
                                    </DrawerHeader>
                                    <DrawerBody>
                                        <CreateSubscription/>
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
                        <Heading color="blue.700" fontSize="xl">Subscriptions</Heading>
                        <Spacer/>
                        <Button rightIcon={<BsFillPlusCircleFill/>} color="blue.700" variant="solid" size="sm"  marginRight="3%" _focus={{outline:"none"}} onClick={() => dispatch(toggleAddSubDrawer())}>
                            <Text>
                                Add
                            </Text>
                        </Button>
                    </Flex>
                </Box>
                
                <Box paddingX="2%" h="95%">
                    <Grid templateColumns="repeat(12, 1fr)" h="77vh">
                        <GridItem colSpan={8} overflowY="scroll" borderWidth="1px" borderRadius="3px">
                            {
                                subscriptions && subscriptions.length ?
                                <Accordion allowToggle borderX="1px" borderColor="gray.100">
                                    {
                                        subscriptions.map((subscription) => {
                                            if(subscription) {
                                                return (
                                                    <AccordionItem>
                                                        <AccordionButton _focus={{outline: "none", bg:"gray.100"}} >
                                                            <Box flex="1" textAlign="left">
                                                                <Text color='blue.700'>{subscription.name}</Text>
                                                            </Box>
                                                            <AccordionIcon/>
                                                        </AccordionButton>

                                                        <Divider/>
            
                                                        <AccordionPanel pb={4}>
                                                            <UpdateSubscription subscription={subscription}/>
                                                        </AccordionPanel>
                                                    </AccordionItem>
                                                )
                                            }
                                        })
                                    }
                                </Accordion>
                                :
                                <React.Fragment/>
                            }
                        </GridItem>
                        <GridItem colSpan={4} ml={4}>
                            <Box borderWidth="1px" padding="10px" borderRadius="3px">
                                <VStack >
                                    <Box bg="gray.100" width="100%" padding="3" borderRadius="2px">
                                        <Heading color="blue.700" bg="gray.100" fontSize="xl">
                                            Today's Quote
                                        </Heading>
                                    </Box>

                                    <Divider/>

                                    <Text color="blue.800" fontSize="sm">
                                        {quote.text}
                                    </Text>
                                        
                                    <Heading color="blue.700" fontSize="md">- {quote.author || "unkown"}</Heading>
                                    <Divider/>
                                </VStack>
                            </Box>
                        </GridItem>
                    </Grid>
                </Box>
            </VStack>
        </React.Fragment>
    );
};

export default Subscriptions;