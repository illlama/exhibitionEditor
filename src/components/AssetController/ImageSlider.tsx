import React, { useRef } from 'react';
import styled from '@emotion/styled';

import chevronLeftIcon from 'images/chevron-left.png';
import chevronRightIcon from 'images/chevron-right.png';

type Props = {
    imgList: string[];
    addEditorImageState: (image: string) => void;
};
const ImageSlider = ({ imgList, addEditorImageState }: Props) => {
    const imageSliderRef = useRef<HTMLDivElement | null>(null);

    const onClickImage = (image: string) => {
        addEditorImageState(image);
    };

    const onClickLeftButton = (e: React.MouseEvent) => {
        if (!imageSliderRef.current) return;
        imageSliderRef.current.scroll({ left: imageSliderRef.current.scrollLeft - 300, behavior: 'smooth' });
    };

    const onClickRightButton = (e: React.MouseEvent) => {
        if (!imageSliderRef.current) return;
        imageSliderRef.current.scroll({ left: imageSliderRef.current.scrollLeft + 300, behavior: 'smooth' });
    };

    return (
        <Container>
            <LeftButton onClick={onClickLeftButton}>
                <img src={chevronLeftIcon} alt="left button" />
            </LeftButton>
            <ImageWrapper ref={imageSliderRef}>
                {imgList.map((image, i) => {
                    return (
                        <Image key={i} onClick={() => onClickImage(image)}>
                            <img src={image} alt={`선택이미지${i}`} draggable={false} />
                        </Image>
                    );
                })}
            </ImageWrapper>
            <RightButton onClick={onClickRightButton}>
                <img src={chevronRightIcon} alt="right button" />
            </RightButton>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 150px;
    background: #e1e5ea;
    margin-bottom: 20px;
    position: relative;
`;

const Button = styled.div`
    width: 30px;
    height: 100%;
    position: absolute;
    top: 0px;
    background-color: rgba(41, 40, 65, 0.2);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
`;

const LeftButton = styled(Button)`
    cursor: pointer;
    left: 0px;
`;

const RightButton = styled(Button)`
    cursor: pointer;
    right: 0px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 50px;
    display: flex;
    gap: 20px;
    align-items: center;
    overflow-x: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const Image = styled.div`
    cursor: pointer;
    & img {
        max-height: 130px;
    }
`;

export default ImageSlider;
