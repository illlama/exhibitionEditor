import React from 'react';
import styled from '@emotion/styled';
import { SketchPicker, ColorChangeHandler } from 'react-color';

interface Props {
    color: string;
    handleColor: (color: string) => void;
}

const ColorPicker = ({ color, handleColor }: Props) => {
    const handleChange: ColorChangeHandler = (color) => {
        handleColor(color.hex);
    };

    return (
        <Container>
            <SketchPicker color={color} onChange={handleChange} />
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    top: 60px;
    left: 15px;
    z-index: 900;
`;

export default ColorPicker;
