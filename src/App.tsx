import React, { ReactElement, useEffect, useState } from "react"
import Header from "./Header/Header"
import MainSlider from "./MainSlider/MainSlider"
import GallerySlider from "./GallerySlider/GallerySlider"
import About from "./About/About"
import EventSection from "./Event/Event"
import MoreSection from "./MoreSection/MoreSection"
import Footer from "./Footer/Footer"

const App = () : ReactElement => {

    const [windowSize, setWindowSize] = useState<number>(0);


    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
        
    }, []);



    return (
        <>
            <Header windowSize={windowSize} />
            <MainSlider />
            <GallerySlider windowSize={windowSize} />
            <About />
            <EventSection />
            <MoreSection />
            <Footer />
        </>
    )
}

export default App;