import React, { ReactElement } from "react"
import Header from "./Header/Header"
import MainSlider from "./MainSlider/MainSlider"
import GallerySlider from "./GallerySlider/GallerySlider"

const App = () : ReactElement => {


    return (
        <>
            <Header />
            <MainSlider />
            <GallerySlider />
        </>
    )
}

export default App;