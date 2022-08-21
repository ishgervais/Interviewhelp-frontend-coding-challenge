import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Slide } from '../types'
import SlideComponent from "./Slide";
import React from "react";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const NavigationButtons = styled.div`
  position: relative;
  display: flex;

  height: 60px;
  margin: 0 auto;
  width: 20%;
  margin-top: 1rem;
  justify-content: space-between;
  z-index: 1000;
`;

const NavBtn = styled.div`
  background: #2d73a2;
  padding: 15px;
  cursor: pointer;
  margin-left: 12px;
  margin-bottom: 10px;
  border-radius: 3px;
`;

function mod(a: number, b: number) {
    return ((a % b) + b) % b;
}

function VerticalCarousel(props: {
    slides: Slide[], goToSlide?: number,
    showNavigation: boolean,
    offsetRadius: number,
    animationConfig: object,
    handleClick: Function
}) {
    const [index, setIndex] = useState(0);
    const [goToSlide, setGoToSlide] = useState(null);
    const [prevPropsGoToSlide, setPrevPropsGoToSlide] = useState(0);
    const [newSlide, setNewSlide] = useState(false);

    useEffect(() => {
        document.addEventListener("keydown", event => {
            if (event.isComposing || event.keyCode === 229) {
                return;
            }
            if (event.keyCode === 38) {
                moveSlide(-1);
            }
            if (event.keyCode === 40) {
                moveSlide(1);
            }
        });
    }, []);

    const defaultProps = {
        offsetRadius: 2,
        animationConfig: { tension: 120, friction: 14 }
    };


    const modBySlidesLength = (index: number) => {
        return mod(index, props.slides.length);
    };

    const moveSlide = (direction: number) => {
        const i = modBySlidesLength(index + direction);
        setIndex(i)
        setGoToSlide(null);
        props.handleClick(props.slides[i].offset);
    };

    const clampOffsetRadius = (offsetRadius: number) => {
        const { slides } = props;
        const upperBound = Math.floor((slides.length - 1) / 2);

        if (offsetRadius < 0) {
            return 0;
        }
        if (offsetRadius > upperBound) {
            return upperBound;
        }

        return offsetRadius;
    }

    const getPresentableSlides = () => {
        const { slides } = props;
        console.log('\n\n\n', slides)
        let { offsetRadius } = props;
        offsetRadius = clampOffsetRadius(offsetRadius);
        const presentableSlides = new Array();

        for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
            presentableSlides.push(slides[modBySlidesLength(index + i)]);
        }

        return presentableSlides;
    }

    const { animationConfig, offsetRadius, showNavigation } = props;

    let navigationButtons = null;
    if (showNavigation) {
        navigationButtons = (
            <NavigationButtons>
                <NavBtn onClick={() => moveSlide(1)}>&#8593;Next</NavBtn>
                <NavBtn onClick={() => moveSlide(-1)}>&#8595;Prev</NavBtn>
            </NavigationButtons>
        );
    }
    return (
        <React.Fragment>
            <Wrapper>
                {getPresentableSlides().map((slide, presentableIndex) => (
                    <SlideComponent
                        key={slide.key}
                        // @ts-ignore
                        content={slide.content}
                        moveSlide={moveSlide}
                        offsetRadius={clampOffsetRadius(offsetRadius)}
                        index={presentableIndex}
                        animationConfig={animationConfig}
                    />
                ))}
            </Wrapper>
            {navigationButtons}
        </React.Fragment>
    );

}

export default VerticalCarousel;