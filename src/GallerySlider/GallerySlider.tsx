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
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const images : imagesProps[] = data.slider;

    useEffect(() => {
        const x = windowSize - ((windowSize / 100) * 12) - 17;
        const r = Math.ceil((images.length * 330) / x);
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
            const x = (marginLeftCurrent - diff) < 0  ? (marginLeftCurrent - diff) : 0 ;
            const maxx = -1 * ( (330 * images.length) - (windowSize - ((windowSize / 100) * 12)) );

            const xx  = x < maxx ? maxx : x;
            dragBoxRef.current.style.marginLeft = xx + "px";
            setStartScreen(e.screenX);

            const r = Math.floor(Math.abs((xx * 1.25) / (windowSize - ((windowSize / 100) * 12))))
            setSliderPos(r);
        }
    }
    const endDrag = () => {
        setDrag(false)
    };

    const moveSlider = (item : number) => {
        if(dragBoxRef.current){
            const x = windowSize - ((windowSize / 100) * 12);
            const maxx = -1 * ( (330 * images.length) - x );
            const move = ((maxx / radio.length) - ((radio.length * 330) / 2)) * item - (40 * item);
            dragBoxRef.current.style.marginLeft = move + "px";
        }
    }

    return (
        <div className='oferts'>
            <h1 className='oferts-header' >Nasza Oferta</h1>
            <p className='oferts-text' >Wszystkie, zabiegi, których szukasz, w jednym, wyjątkowym miejscu</p>
            <div className='oferts-slider' >
                <div className='oferts-left-arrow' >

                </div>
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
                <div className='oferts-right-arrow'>

                </div>
            </div>

            <div>
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