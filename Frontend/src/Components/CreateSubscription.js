import React, {useState, useEffect, useDisclosure} from "react";
import {
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Drawer,
    Button,
    Input,
    Stack,
    Select,
    Flex,
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {toggleAddSubDrawer, addSubscription} from "../ReduxStore/Actions";
import Cookies from "js-cookie";
import APIS from "../APIS";

const CreateSubscription = props => {
    const dispatch = useDispatch();

    const [ isOpen, setIsOpen ] = useState(true);
    const [name, setName] = useState();
    const [subscriptionPeriod, setSubscriptionPeriod] = useState("");
    const [subscriptionAmount, setSubscriptionAmount] = useState();
    const [isLoading, setIsLoading] = useState(false);

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

    const saveSubscription = () => {
        setIsLoading(true);
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        APIS.createSubscription(adminId, token, {name, subscriptionPeriod, subscriptionAmount})
        .then(res => {
            console.log("res", res);
            dispatch(addSubscription(res));
            dispatch(toggleAddSubDrawer());
            setIsLoading(false);
        });
    };

    return (
        <React.Fragment>
            <Stack spacing={4} mt="2%">
                <Input 
                    variant="outline"
                    placeholder="Name"
                    value={name}  
                    _focus={{outline: "none"}} 
                    type="text"
                    color="gray.600"
                    id="name"
                    size="sm"
                    onChange={event => handleChange(event, "name")}
                />
                <Select variant="outline" _focus={{outline:"none"}} color="gray.600" id="period" onChange={event => handleChange(event, "period")} size="sm">
                    <option>monthly</option>
                    <option>quarterly</option>
                    <option>halfyearly</option>
                    <option>annually</option>
                </Select>
                <Input 
                    variant="outline"
                    placeholder="Amount"
                    value={subscriptionAmount}
                    _focus={{outline: "none"}}
                    type="Number"
                    color="gray.600"
                    id="amount"
                    onChange={event => handleChange(event, "amount")}
                    size="sm"
                />
                <Flex align="flex-start">
                    {
                        isLoading ? 
                        <Button mr={4} variant="solid" color="blue.700" isLoading size="sm"/>
                        :
                        <Button mr={4} variant="solid" color="blue.700" size="sm" onClick={() => saveSubscription()} _focus={{outline:"none"}}>
                            Save
                        </Button>
                    }
                    <Button variant="outline" color="blue.700" size="sm" onClick={() => dispatch(toggleAddSubDrawer())} _focus={{outline:"none"}}>
                        Cancel
                    </Button>
                </Flex>
            </Stack>
        </React.Fragment>
    );
}

export default CreateSubscription;