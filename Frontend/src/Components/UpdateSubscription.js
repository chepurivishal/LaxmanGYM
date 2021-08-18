import { Flex, HStack, Input, Spacer, VStack, Button, Text, FormLabel, Stack, Heading, Select, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubscription } from "../APIS";
import { loadSubscriptions } from "../ReduxStore/Actions";

const apis = require("../APIS");

const UpdateSubscription = props => {
    const dispatch = useDispatch();

    const [name, setName] = useState(props.subscription.name);
    const [subscriptionPeriod, setSubscriptionPeriod] = useState(props.subscription.subscriptionPeriod);
    const [subscriptionAmount, setSubscriptionAmount] = useState(props.subscription.subscriptionAmount);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const handleChange = (event, id) => {

        if(id !== "period") document.getElementById(id).value = event.target.value;

        switch(id) {
            case "name":
                setName(event.target.value);
                break;
            case "period":
                setSubscriptionPeriod(event.target.value);
                break;
            case "amount":
                setSubscriptionAmount(event.target.value);
                break;
        }
    };

    const onSave = () => {
        setIsSaveLoading(true);
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        const obj = {name, subscriptionPeriod, subscriptionAmount};
        apis.updateSubscription(adminId, token, obj, props.subscription._id)
        .then(res => {
            setIsSaveLoading(false);
            apis.getSubscriptions(adminId, token)
            .then(response => {
                dispatch(loadSubscriptions(response));
            });
        });
        
    };

    const onDelete = () => {
        setIsDeleteLoading(true);
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        apis.deleteSubscription(adminId, token, props.subscription._id)
        .then(res => {
            setIsDeleteLoading(false);
            setOpenDeleteAlert(false);
            apis.getSubscriptions(adminId, token)
            .then(response => {
                dispatch(loadSubscriptions(response));
            });
        });
    };

    return (
        <React.Fragment>
        
            <AlertDialog isOpen={openDeleteAlert}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Subscription
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete Subscription Permanently?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <HStack spacing={5}>
                                <Button variant="solid" color="tomato" size="sm" onClick={() => onDelete()} _focus={{outline:"none"}}>
                                    Yes
                                </Button>
                                <Button variant="solid" color="blue.700" size="sm" onClick={() => setOpenDeleteAlert(false)} _focus={{outline:"none"}}>
                                    Cancel
                                </Button>
                            </HStack>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>


            <VStack spacing="10px" align="stretch">
                <Stack spacing="5px">
                    <Stack spacing="1px">
                        <Heading fontSize="sm">Name</Heading>
                        <Input
                            variant="outline"
                            size="sm"
                            value={name}
                            id="name"
                            onChange={event => handleChange(event, "name")}
                        />
                    </Stack>

                    <Stack spacing="1px">
                        <Heading fontSize="sm">Period</Heading>
                        <Select
                            variant="outline"
                            size="sm"
                            value={subscriptionPeriod}
                            id="period"
                            onChange={event => handleChange(event, "period")}
                        >
                            <option>monthly</option>
                            <option>quarterly</option>
                            <option>halfyearly</option>
                            <option>annually</option>
                        </Select>
                    </Stack>

                    <Stack spacing="1px">
                        <Heading fontSize="sm">Amount</Heading>
                        <Input
                            variant="outline"
                            size="sm"
                            value={subscriptionAmount}
                            id="amount"
                            onChange={event => handleChange(event, "amount")}
                        />
                    </Stack>

                </Stack>
                <HStack spacing="4px">
                    {
                        isSaveLoading ?
                        <Button
                            variant="solid"
                            color="blue.700"
                            size="sm"
                            isLoading
                        />
                    :
                        <Button
                            variant="solid"
                            color="blue.700"
                            size="sm"
                            onClick={() => onSave()}
                            _focus={{
                                outline: "none"
                            }}
                        >
                            Save
                        </Button>
                    }
                    <Button
                        variant="solid"
                        color="tomato"
                        size="sm"
                        onClick={() => setOpenDeleteAlert(true)}
                        _focus={{
                            outline: "none"
                        }}
                    >
                        Delete                    
                    </Button>
                </HStack>
            </VStack>
        </React.Fragment>
    )
};

export default UpdateSubscription;