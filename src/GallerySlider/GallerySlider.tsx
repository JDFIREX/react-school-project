import { ReactElement, useEffect, useRef, useState } from "react";
import * as data from "./data.json"
import "./galery.scss"

interface imagesProps {
    title : string,
    image : string,
    text : string
}

const GallerySlider = () : ReactElement => {

    const [dragStatus,setDrag] = useState<boolean>(false);
    const [sliderPos, setSliderPos] = useState<number>(0);
    const [startScreen, setStartScreen] = useState<number>(0);
    const [radio, setRadio] = useState<number[]>([0,1,2,3]);
    const dragBoxRef = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize] = useState<number>(0);
      useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
            if(dragBoxRef.current){
                dragBoxRef.current.style.marginLeft = "0px";
            }
            setSliderPos(0)
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const images : imagesProps[] = data.slider;

    useEffect(() => {
        const x = windowSize - ((windowSize / 100) * 12) - 17;
        const r = Math.round((images.length * 330) / x);
        let y = []
        for(let i = 0 ; i < r ; i++){
            y.push(i)
        }
        setRadio(y)
    }, [images,windowSize])


    const startDrag = (e : React.MouseEvent) => {
        setDrag(true)
        setStartScreen(e.screenX);
    };
    const move = (e : React.MouseEvent) => {
        if(dragStatus && dragBoxRef.current){

            const marginLeftCurrent = parseFloat(dragBoxRef.current.style.marginLeft) || 0;
            const diff = (startScreen - e.screenX);
            const window = windowSize - ((windowSize / 100) * 12) - 17;
            const x = marginLeftCurrent - diff;
            const maxMove = ((330 * (images.length - 1)) + 300 - window) * -1;

            if(x > 0){
                dragBoxRef.current.style.marginLeft = "0px";
            }else  if(x > maxMove){
                dragBoxRef.current.style.marginLeft = x + "px";
            } else {
                dragBoxRef.current.style.marginLeft = maxMove + "px";
            }

            setStartScreen(e.screenX);


            const posR = parseFloat(dragBoxRef.current.style.marginLeft) / (window);
            console.log(parseFloat(dragBoxRef.current.style.marginLeft) / (window))

            setSliderPos(Math.round(Math.abs(posR)));
        }
    }
    const endDrag = () => {
        setDrag(false)
    };

    const moveSlider = (item : number) => {
        if(dragBoxRef.current){
            const window = windowSize - ((windowSize / 100) * 12);
            const imgPerW = (window + 30) / 330;
            const posR = (imgPerW * 330) * item * -1;
            const maxMove = ((330 * (images.length - 1)) + 300 - window) * -1;
            if(posR < maxMove){
                dragBoxRef.current.style.marginLeft = maxMove - 17 + "px";
            } else {
                dragBoxRef.current.style.marginLeft = posR + "px";
            }
            setSliderPos(item);
        }
    }

    const moveLeft = () => {
        const window = windowSize - ((windowSize / 100) * 12);
        const maxMove = ((330 * (images.length - 1)) + 300 - window) * -1;
        if(dragBoxRef.current){
            const move = parseFloat(dragBoxRef.current.style.marginLeft) + 330;
            if(move > 0){
                dragBoxRef.current.style.marginLeft = "0px";
            } else {
                dragBoxRef.current.style.marginLeft = move + "px";
            }
        }
    }

    const moveRight = () => {
        const window = windowSize - ((windowSize / 100) * 12);
        const maxMove = ((330 * (images.length - 1)) + 300 - window) * -1;
        if(dragBoxRef.current){
            const move = parseFloat(dragBoxRef.current.style.marginLeft) - 330;
            if(move < maxMove){
                dragBoxRef.current.style.marginLeft = maxMove + "px";
            } else {
                dragBoxRef.current.style.marginLeft = move + "px";
            }
        }
    }

    return (
        <div className='oferts'>
            <h1 className='oferts-header' >Nasza Oferta</h1>
            <p className='oferts-text' >Wszystkie, zabiegi, których szukasz, w jednym, wyjątkowym miejscu</p>
            
            <div className='oferts-left-arrow' onClick={moveLeft} >
                <svg aria-hidden="true" focusable="false" width='25px' height='80px' data-prefix="fas" data-icon="chevron-left" className="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
            
            </div>
            <div className='oferts-slider' >

                <div
                    className='oferts-drag-box'
                    ref={dragBoxRef}
                    onMouseDown={startDrag}
                    onMouseMove={move}
                    onMouseUp={endDrag}
                    onMouseLeave={endDrag}
                >
                    {images.map((item : imagesProps, index : number) => {
                        return (
                            <div key={index} className='box'>
                                <div  style={{backgroundImage : `url(${item.image})`}} />
                                <h1>{item.title}</h1>
                                <p>{item.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='oferts-right-arrow'  onClick={moveRight}>
                <svg  width='25px' height='50px' aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
            </div>

            <div className="radios">
                {
                    radio.map(item => (
                        <input type="radio" name="radio" id="" checked={sliderPos === item} onClick={() => moveSlider(item)} />
                    ))
                }
            </div>


        </div>
    )
}

export default GallerySlider;