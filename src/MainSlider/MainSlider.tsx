import { ReactElement, useState } from "react";
import "./MainSlider.scss"

const MainSlider = () : ReactElement => {

    const [slider,setSlider] = useState<number>(0);
    const titles : {title : string, text : string}[] = [
        {
            title : "23423423 ipsum dolor sit amet",
            text : "In ut magna non nunc dapibus imperdiet. Sed neque quam, ornare gravida lorem id, imperdiet vestibulum ligula."
        },
        {
            title : "Lorem ipsum dolor sit amet",
            text : "In ut magna non nunc dapibus imperdiet. Sed neque quam, ornare gravida lorem id, imperdiet vestibulum ligula."
        },
        {
            title : "sdffwfwefw ipsum dolor sit amet",
            text : "In ut magna non nunc dapibus imperdiet. Sed neque quam, ornare gravida lorem id, imperdiet vestibulum ligula."
        }
        ,{
            title : "34545gf45g45g34 ipsum dolor sit amet",
            text : "In ut magna non nunc dapibus imperdiet. Sed neque quam, ornare gravida lorem id, imperdiet vestibulum ligula."
        }
]

    return (
        <div  className='slider-header' >
            <div className='slider-background' style={{backgroundImage : 'url(https://www.bellespa.pl/wp-content/themes/bellespa/images/header-woman.png)'}}  />
            <div className='slider-info' >
                <h1>
                    {titles[slider].title}
                </h1>
                <p>
                    {titles[slider].text}
                </p>
                <button>Czytaj więcej</button>
                <div className='slider-radio' >
                    {titles.map((item : {title : string, text : string}, index : number) => {
                        return (
                            <input type="radio" name="slider" className='slider' onClick={() => setSlider(index)} />
                        )
                    })}
                </div>
            </div>

        </div>
    )
}
export default MainSlider