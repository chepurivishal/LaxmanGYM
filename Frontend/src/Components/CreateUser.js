import { Image, Center, Avatar, CloseButton, Button, Radio, HStack, Stack, Input, Box, Text, Select, RadioGroup, Divider, Spacer, Heading, VStack, Checkbox, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddUserDrawer, addUsers, toggleUpdateUserDrawer } from "../ReduxStore/Actions";
import Camera from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import { AiFillCamera } from "react-icons/ai";
import Cookies from "js-cookie";
import moment from "moment";
import APIS from "../APIS";

const medicalHistory = require("../config/medicalhistory.json");
const _ = require("lodash");

const CreateUser = props => {
    const dispatch = useDispatch();
    const subscriptions = useSelector(state => state.subscriptions.subscriptions);
    let initialUserState = {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        pincode: "",
        DOB: "",
        maritalStatus: "married",
        gender: "male",
        subscription: "Weightlift Quarterly",
        medicalHistory: {},
        profilePic: "https://bit.ly/broken-link",
        startDate: "",
        endDate: ""
    };
    let initialPhysician = {
        name: "",
        phoneNumber: ""
    };

    let initialEmergencyContact = {
        name: "",
        relationdship: "",
        phoneNumber: ""
    };

    let initialMedicalHistory = {};
    medicalHistory.forEach(key => {
        initialMedicalHistory[key] = false;
    });

    if(props.user) {
        initialUserState = props.user;
        const subscription = _.find(subscriptions, {_id: props.user.subscription});
        if(subscription) {
            initialUserState.subscription = subscription.name;
        }
        initialUserState.DOB = new Date(props.user.DOB);
        initialPhysician = props.user.physician;
        initialEmergencyContact = props.user.emergencyContact;
        initialMedicalHistory = props.user.medicalHistory;
    }

    const [user, setUser] = useState(initialUserState);
    const [physician, setPhysician] = useState(initialPhysician);
    const [emergencyContact, setEmergencyContact] = useState(initialEmergencyContact);
    const [_medicalHistory, setMedicalHistory] = useState(initialMedicalHistory);
    const [openCamera, setOpenCamera] = useState(false);

    const handleInputChange = (event, id, key, stateName) => {
        document.getElementById(id).value = event.target.value;

        switch (stateName) {
            case "user":
                setUser({
                    ...user,
                    [key]: event.target.value
                });
                break;
            case "physician":
                setPhysician({
                    ...physician,
                    [key]: event.target.value
                });
                break;
            case "emergencycontact":
                setEmergencyContact({
                    ...emergencyContact,
                    [key]: event.target.value
                });
                break;
            case "medicalhistory":
                setMedicalHistory({
                    ..._medicalHistory,
                    [key]: event.target.value
                });
                break;
        }
    };

    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
      
        return new File([u8arr], filename, { type: mime });
      }

    const handleOnTakePicture = dataUri => {
        setUser({
            ...user,
            profilePic: dataUri
        });
        setOpenCamera(false);
    };

    const createUser = (adminId, token, data) => {
        let filedata = new FormData();
        filedata.append("image", dataURLtoFile(user.profilePic, "profile"))
        APIS.s3upload(adminId, token, filedata)
        .then(res => {
            data.profilePic = res.Location;
            APIS.createUser(adminId, token, data)
                .then(res => {
                    if (res) {
                        dispatch(addUsers(res));
                        dispatch(toggleAddUserDrawer());
                    }
                })
        })
    };

    const updateUser = (adminId, token, id, data) => {
        APIS.updateUser(adminId, token, id, data)
        .then(res => {
            dispatch(toggleUpdateUserDrawer());
        });
    };

    const onClickSave = () => {
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        let data = {
            ...user,
            profilePic: user.profilePic,
            physician: physician,
            emergencyContact: emergencyContact,
            medicalHistory: _medicalHistory
        };
        data.subscription = _.find(subscriptions, { name: data.subscription })._id;
        if(props.user) updateUser(adminId, token, props.user._id, data);
        else createUser(adminId, token, data);
    }

    const renewSubscrption = () => {
        const adminId = JSON.parse(Cookies.get("adminId"));
        const token = JSON.parse(Cookies.get("token"));
        const subscriptionId = (user && user.subscription)? _.find(subscriptions, {name: user.subscription})._id: props.user.subscription;
        APIS.renewSubscription(adminId, token, props.user._id, subscriptionId)
        .then(res => {
            dispatch(toggleUpdateUserDrawer());
        })
    };

    return (
        <React.Fragment>
            <Modal isOpen={openCamera} size="xl">
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader>
                    </ModalHeader> */}
                    <CloseButton onClick={() => setOpenCamera(false)} _focus={{ outline: "none" }} />
                    <ModalBody padding="0">
                        <Camera
                            onTakePhoto={dataUri => { handleOnTakePicture(dataUri) }}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Stack>
                <Heading fontSize="md" color="blue.700">Personal Details</Heading>
                <Spacer />
                <Grid
                    templateRows="repeat(3, 1fr)"
                    templateColumns="repeat(12, 1fr)"
                >
                    <GridItem rowSpan={3} colSpan={2} paddingRight="10%">
                        <VStack>
                            <Avatar size="xl" src={user.profilePic} />
                            {
                                props.user?
                                <Button disabled rightIcon={<AiFillCamera />} size="sm" variant="solid" color="blue.700" onClick={() => setOpenCamera(true)} _focus={{ outline: "none" }}>
                                    Take Pic
                                </Button>
                                :
                                <Button rightIcon={<AiFillCamera />} size="sm" variant="solid" color="blue.700" onClick={() => setOpenCamera(true)} _focus={{ outline: "none" }}>
                                    Take Pic
                                </Button>
                            }
                        </VStack>

                    </GridItem>

                    <GridItem rowSpan={1} colSpan={10}>
                        <HStack>
                            <Box w="100%">
                                <Text>Name</Text>
                                <Input
                                    variant="outline"
                                    placeholder="Name"
                                    size="sm"
                                    _focus={{ outline: "none" }}
                                    value={user.name}
                                    id="name"
                                    onChange={event => handleInputChange(event, "name", "name", "user")}
                                />
                            </Box>
                            <Box w="100%">
                                <Text>Email</Text>
                                <Input
                                    variant="outline"
                                    placeholder="Email"
                                    size="sm"
                                    _focus={{ outline: "none" }}
                                    value={user.email}
                                    id="email"
                                    onChange={event => handleInputChange(event, "email", "email", "user")}
                                />
                            </Box>
                        </HStack>
                    </GridItem>

                    <GridItem rowSpan={1} colSpan={10}>
                        <HStack>
                            <Box w="100%">
                                <Text>Address</Text>
                                <Input
                                    variant="outline"
                                    placeholder="Address"
                                    size="sm"
                                    _focus={{ outline: "none" }}
                                    value={user.address}
                                    id="address"
                                    onChange={event => handleInputChange(event, "address", "address", "user")}
                                />
                            </Box>
                            <Box w="100%">
                                <Text>Pincode</Text>
                                <Input
                                    variant="outline"
                                    placeholder="Pincode"
                                    size="sm"
                                    _focus={{ outline: "none" }}
                                    value={user.pincode}
                                    id="pincode"
                                    onChange={event => handleInputChange(event, "pincode", "pincode", "user")}
                                />
                            </Box>
                        </HStack>
                    </GridItem>

                    <GridItem rowSpan={1} colSpan={10}>
                        <HStack>
                            <Box w="100%">
                                <Text>DOB</Text>
                                <Input
                                    variant="outline"
                                    placeholder="DOB"
                                    type="date"
                                    size="sm"
                                    _focus={{ outline: "none" }}
                                    value={props.user ? moment(user.DOB).format("YYYY-MM-DD") : user.DOB}
                                    id="DOB"
                                    onChange={event => handleInputChange(event, "DOB", "DOB", "user")}
                                />
                            </Box>
                            <Box w="100%">
                                <Text>Phone Number</Text>
                                <Input
                                    variant="outline"
                                    placeholder="Phone Number"
                                    size="sm"
                                    _focus={{ outline: "none" }}
                                    value={user.phoneNumber}
                                    id="phonenumber"
                                    onChange={event => handleInputChange(event, "phonenumber", "phoneNumber", "user")}
                                />
                            </Box>
                        </HStack>
                    </GridItem>
                </Grid>
                <HStack>
                    <Box w="100%">
                        <Center>
                            {/* <Text>Gender</Text> */}
                            <RadioGroup
                                value={user.gender}
                                id="gender"
                                mt="3%"
                            >
                                <HStack>
                                    <Radio
                                        colorScheme="blue"
                                        value="male"
                                        onChange={event => handleInputChange(event, "gender", "gender", "user")}
                                        _focus={{ outline: "none" }}
                                    >Male</Radio>
                                    <Radio
                                        colorScheme="blue"
                                        value="female"
                                        onChange={event => handleInputChange(event, "gender", "gender", "user")}
                                        _focus={{ outline: "none" }}
                                    >Female</Radio>
                                </HStack>
                            </RadioGroup>
                        </Center>
                    </Box>
                    <Box w="100%">
                        <Center>
                            {/* <Text>Marital Status</Text> */}
                            <RadioGroup
                                value={user.maritalStatus}
                                id="maritalstatus"
                                mt="3%"
                            >
                                <HStack>
                                    <Radio
                                        color="blue.700"
                                        value="married"
                                        onChange={event => handleInputChange(event, "maritalstatus", "maritalStatus", "user")}
                                        _focus={{ outline: "none" }}
                                    >Married</Radio>
                                    <Radio
                                        color="blue.700"
                                        value="unmarried"
                                        onChange={event => handleInputChange(event, "maritalstatus", "maritalStatus", "user")}
                                        _focus={{ outline: "none" }}
                                    >Unmarried</Radio>
                                </HStack>
                            </RadioGroup>
                        </Center>
                    </Box>
                </HStack>
                <Spacer />
                <Divider />
                <Heading fontSize="md" color="blue.700">Subscription Type</Heading>
                <HStack spacing={4} mt="2%">
                    <Box w="100%">
                        <Text>Subscription</Text>
                        <Select
                            variant="outline"
                            type="select"
                            size="sm"
                            _focus={{ outline: "none" }}
                            value={user.subscription}
                            id="subscription"
                            onChange={event => handleInputChange(event, "subscription", "subscription", "user")}
                        >
                            {
                                subscriptions.map(subscription => {
                                    return <option>{subscription.name}</option>
                                })
                            }
                        </Select>
                    </Box>
                </HStack>
                {
                    props.user ?
                    <React.Fragment>
                    <HStack>
                        <Box w="100%">
                            <Text>Start Date</Text>
                            <Input
                                variant="outline"
                                type="date"
                                size="sm"
                                _focus={{ outline: "none" }}
                                value={moment(user.startDate).format("YYYY-MM-DD")}
                                isDisabled={true}
                            />
                        </Box>
                        <Box w="100%">
                            <Text>End Date</Text>
                            <Input
                                variant="outline"
                                type="date"
                                size="sm"
                                _focus={{ outline: "none" }}
                                value={moment(user.endDate).format("YYYY-MM-DD")}
                                isDisabled={true}
                            />
                        </Box>
                    </HStack>
                    <Button variant="solid" size="sm" color="blue.700" _focus={{ outline: "none" }} w="20%" onClick={() => renewSubscrption()}>Renew Subscription</Button>
                    </React.Fragment>
                    : <React.Fragment/>
                }
                <Spacer />
                <Divider />
                <Heading fontSize="md" color="blue.700">Physician Details</Heading>
                <HStack>
                    <Box w="100%">
                        <Text>Name</Text>
                        <Input
                            variant="outline"
                            placeholder="Name"
                            size="sm"
                            _focus={{ outline: "none" }}
                            value={physician.name}
                            id="pname"
                            onChange={event => handleInputChange(event, "pname", "name", "physician")}
                        />
                    </Box>
                    <Box w="100%">
                        <Text>PhoneNumber</Text>
                        <Input
                            variant="outline"
                            placeholder="Phone Number"
                            size="sm"
                            _focus={{ outline: "none" }}
                            value={physician.phoneNumber}
                            id="pphonenumber"
                            onChange={event => handleInputChange(event, "pphonenumber", "phoneNumber", "physician")}
                        />
                    </Box>
                </HStack>
                <Spacer />
                <Divider />

                <Heading fontSize="md" color="blue.700">Emergency Contact Details</Heading>
                <HStack>
                    <Box w="100%">
                        <Text>Name</Text>
                        <Input
                            variant="outline"
                            placeholder="Name"
                            size="sm"
                            _focus={{ outline: "none" }}
                            value={emergencyContact.name}
                            id="ename"
                            onChange={event => handleInputChange(event, "ename", "name", "emergencycontact")}
                        />
                    </Box>
                    <Box w="100%">
                        <Text>PhoneNumber</Text>
                        <Input
                            variant="outline"
                            placeholder="Phone Number"
                            size="sm"
                            _focus={{ outline: "none" }}
                            id="ephonenumber"
                            value={emergencyContact.phoneNumber}
                            onChange={event => handleInputChange(event, "ephonenumber", "phoneNumber", "emergencycontact")}
                        />
                    </Box>
                    <Box w="100%">
                        <Text>Relation</Text>
                        <Input
                            variant="outline"
                            placeholder="Relation"
                            size="sm"
                            _focus={{ outline: "none" }}
                            value={emergencyContact.relationship}
                            id="erelation"
                            onChange={event => handleInputChange(event, "erelation", "relationship", "emergencycontact")}
                        />
                    </Box>
                </HStack>
                <Spacer />
                <Divider />

                <Heading fontSize="md" color="blue.700">Medical History</Heading>
                {
                    medicalHistory.map((key, index) => {
                        return (
                            <Flex key={index}>
                                <Heading fontSize="sm">{key}</Heading>
                                <Spacer />
                                {
                                    _medicalHistory[key] ?
                                        <Checkbox isChecked _focus={{ outline: "none" }}
                                            onChange={() => setMedicalHistory({
                                                ..._medicalHistory,
                                                [key]: false
                                            })}
                                        ></Checkbox>
                                        :
                                        <Checkbox _focus={{ outline: "none" }}
                                            onChange={() => setMedicalHistory({
                                                ..._medicalHistory,
                                                [key]: true
                                            })}></Checkbox>
                                }
                            </Flex>
                        )
                    })
                }
                <Spacer />
                <Divider />
                <HStack>
                    <Button mr={4} variant="solid" color="blue.700" size="sm" _focus={{ outline: "none" }} onClick={() => onClickSave()}>
                        Save
                    </Button>
                    <Button variant="outline" color="blue.700" size="sm" onClick={() => props.user ? dispatch(toggleUpdateUserDrawer()): dispatch(toggleAddUserDrawer())} _focus={{ outline: "none" }}>
                        Cancel
                    </Button>
                </HStack>
                <Spacer />
                <Spacer />
            </Stack>
        </React.Fragment>
    )
};

export default CreateUser;