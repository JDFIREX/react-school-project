import React, { ReactElement } from "react"
import Header from "./Header/Header"
import MainSlider from "./MainSlider/MainSlider"
import GallerySlider from "./GallerySlider/GallerySlider"
import About from "./About/About"
import EventSection from "./Event/Event"
import MoreSection from "./MoreSection/MoreSection"

const App = () : ReactElement => {


    return (
        <>
            <Header />
            <MainSlider />
            <GallerySlider />
            <About />
            <EventSection />
            <MoreSection />
        </>
    )
}

export default App;