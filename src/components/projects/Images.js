import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImagesWrapper = styled.div`
    width: 100%;
    height: 100%;
`;
const Image = styled.img.attrs(({ scroll }) => ({
    style: {
        transform: `translateY(-${scroll}%)`,
    },
}))`
    position: absolute;
    border-radius: 6px;
    transition: transform 0.2s ease-out;
    right: ${props => props.right}vw;
    bottom: ${props => props.bottom}vh;
    height: ${props => props.height}vh;
    z-index: ${props => props.zIndex};
`;

function Images(props) {
    const zIndexArr = [1, 3, 2];
    const rightArr = [4, 2, 6];

    const [bottomArr, setBottomArr] = useState([-200, -120, -60]);
    const [heightArr, setHeightArr] = useState([38, 42, 36]);

    useEffect(() => {
        if (props.screenHeight && props.contentWidth) {
            const divisor = (1000 / props.contentWidth) * 4;
            const midHeight = -1 * Math.round(props.screenHeight / divisor);
            const midWidth = Math.round(props.contentWidth / 15);
            setBottomArr([midHeight - Math.round(props.contentWidth / 8), midHeight, midHeight + Math.round(props.contentWidth / 12)]);
            setHeightArr([midWidth - 4, midWidth, midWidth - 5]);
        }
    }, [props.screenHeight, props.contentWidth]);
    
    let scrollParam = 24;
    let scrollPercent = props.scrollPercent;
    (function calcScrollPercent() {
        const heightToBeReducedInVH = (props.boxHeight * props.projectIndex) - 100;
        const scrollOffset = (props.screenHeight * heightToBeReducedInVH) / 100;
        const scrollOffsetInPercent = (scrollOffset * 100 / props.scrollHeight) - ((props.projectIndex - 1) * 2);
        scrollPercent -= scrollOffsetInPercent;
    })();

    const renderImage = (src, i) => {
        if (i) {
            scrollParam /= 2;
        }
        return src ? (
            <Image
                key={i}
                src={src}
                zIndex={zIndexArr[i]}
                right={rightArr[i]}
                bottom={bottomArr[i]}
                height={heightArr[i]}
                scroll={scrollPercent * scrollParam} 
                alt={`project${props.projectIndex}_${i}`}
            />
        ) : null;
    };

    return (
        <ImagesWrapper>
            {
                props.imgs.map(renderImage)
            }
        </ImagesWrapper>
    );
}

Images.propTypes = {
    projectIndex: PropTypes.number.isRequired,
    imgs: PropTypes.array.isRequired,
    boxHeight: PropTypes.number.isRequired,
    screenHeight: PropTypes.number.isRequired,
    scrollHeight: PropTypes.number.isRequired,
    scrollPercent: PropTypes.number.isRequired,
};

export default Images;
