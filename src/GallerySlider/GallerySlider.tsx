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