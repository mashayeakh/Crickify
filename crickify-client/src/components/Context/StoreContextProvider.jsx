import React, { createContext, useEffect, useState } from 'react'
import { getMethod } from '../Utils/Apis';


export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {


    //all bats
    const [bat, setBat] = useState([]);
    //all balls
    const [ball, setBall] = useState([]);
    const [jersery, setJersey] = useState([]);
    const [loader, setLoader] = useState(true);

    const fetchBats = async () => {
        const url = "http://localhost:5000/products"
        const data = await getMethod(url);
        const batCat = data.filter(d => d.category === "bat" || d.category === "bats")
        setBat(batCat);
        setLoader(true);
    }
    const fetchBalls = async () => {
        const url = "http://localhost:5000/products"
        const data = await getMethod(url);
        const ballCat = data.filter(d => d.category === "Ball" || d.category === "Balls")
        setBall(ballCat);
        setLoader(true);
    }
    const fetchJersey = async () => {
        const url = "http://localhost:5000/all-jersies"
        const data = await getMethod(url);
        // const ballCat = data.filter(d => d.category === "Ball" || d.category === "Balls")
        setJersey(data);
        setLoader(true);
    }

    useEffect(() => {
        fetchBats();
        fetchBalls();
        fetchJersey();
    }, [])

    const appData = {
        fetchBats,
        fetchBalls,
        fetchJersey,
        bat,
        ball,
        jersery,
        loader
    };

    return (
        <>
            <StoreContext.Provider value={appData}>
                {children}
            </StoreContext.Provider>
        </>
    )
}

export default StoreContextProvider