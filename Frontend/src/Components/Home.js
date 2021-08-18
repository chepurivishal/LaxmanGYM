import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, GridItem, Box} from "@chakra-ui/react";
import Cookies from "js-cookie";


import Header from "./Header";
import Navbar from "./Navbar";
import Subscriptions from "./Subscriptions";
import Users from "./Users";
import {loadSubscriptions} from "../ReduxStore/Actions";
import APIS from "../APIS";

const Home = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    let tab = useSelector(state => state.tab);
    if(tab) tab = tab.value;

    useEffect(() => {
        if(!Cookies.get("token")) {
            history.push("login");
        }
        getSubscriptions();
    }, []);

    const getSubscriptions = () => {
        const token = JSON.parse(Cookies.get("token"));
        const adminId = JSON.parse(Cookies.get("adminId"));
        APIS.getSubscriptions(adminId, token)
        .then(response => {
            dispatch(loadSubscriptions(response));
        });
    };

    return (
        <Grid
            height="100vh"
            templateRows="repeat(12, 1fr)"
            templateColumns="repeat(20, 1fr)"
        >
            <GridItem rowSpan={1} colSpan={20}>
                <Header/>
            </GridItem>
            <GridItem rowSpan={11} colSpan={1}>
            <Navbar/>
            </GridItem>
            <GridItem rowSpan={11} colSpan={19} overflowY="scroll">
                {
                    (() => {
                        switch(tab) {
                            case "users":
                                return <Users/>
                            case "subscriptions":
                                return <Subscriptions/>
                        }
                    })()
                }
            </GridItem>
        </Grid>
    )
};

export default Home;