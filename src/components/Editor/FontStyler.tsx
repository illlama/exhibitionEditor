import styled from '@emotion/styled';
import React, { useState } from 'react';
import { FontStyle, FontFamily } from 'types';
import alignLeft from 'images/text-align-left.png';
import alignRight from 'images/text-align-right.png';
import alignCenter from 'images/text-align-center.png';

type Props = {
    fontStyle: FontStyle;
    changeFontStyle: (newFontStyle: FontStyle) => void;
};

const FontStyler = ({ fontStyle, changeFontStyle }: Props) => {
    const [fontSize, setFontSize] = useState(fontStyle.fontSize);
    const [fontFamily, setFontFamily] = useState(fontStyle.fontFamily);
    const [align, setAlign] = useState(fontStyle.align);

    const changeFontSize = (v: number) => {
        setFontSize(v > 80 ? 80 : v);
    };
    const toNumber = (value: string | number) => {
        if (typeof value === 'number') return value;
        return parseInt(value.replace(/[^\d]+/g, ''));
    };
    const applyStyles = () => {
        changeFontStyle({
            fontSize,
            fontFamily,
            align,
        });
    };
    return (
        <FontStylerContainer>
            <StylerContent>
                <Label>Font Size</Label>
                <NumInput
                    type="number"
                    value={fontSize}
                    pattern="[0-9]*"
                    onChange={(e) => {
                        changeFontSize(toNumber(e.target.value));
                    }}
                />
            </StylerContent>
            <StylerContent>
                <Label>Font Family</Label>

                <Select name="fontFamily" onChange={(e) => setFontFamily(e.target.value as FontFamily)}>
                    <option value="Noto Sans KR">Noto Sans KR</option>
                    <option value="Montserrat">Montserrat</option>
                </Select>
            </StylerContent>
            <StylerContent>
                <Label>Text Align</Label>
                <Button bg={alignLeft} state={'LEFT' === align} onClick={() => setAlign('LEFT')} />
                <Button bg={alignCenter} state={'CENTER' === align} onClick={() => setAlign('CENTER')} />
                <Button bg={alignRight} state={'RIGHT' === align} onClick={() => setAlign('RIGHT')} />
            </StylerContent>
            <StylerContent>
                <Apply onClick={() => applyStyles()}>Apply</Apply>
            </StylerContent>
        </FontStylerContainer>
    );
};

const FontStylerContainer = styled.div`
    transform: translate(-60px, 160px);
    z-index: 3000;
    padding: 20px;
    background-color: #a7bbc7;
    border-radius: 15px;
    color: #fff;
`;
const StylerContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0px;
    }
`;
const Label = styled.label`
    margin-right: 30px;
`;
const NumInput = styled.input`
    color: #000;
    height: 40px;
    width: 100px;
    outline: none;
    margin-left: 30px;
`;
const Select = styled.select`
    color: #000;
    height: 40px;
    width: 100px;
    outline: none;
    margin-left: 30px;
`;
const Button = styled.button<{ bg: string; state: boolean }>`
    width: 32px;
    height: 100%;
    margin-left: 8px;
    background: url(${(props) => props.bg});
    background-repeat: no-repeat;
    background-position: center;
    padding: 17px;
    border-radius: 3px;
    background-color: ${(props) => (props.state ? '#E1E5EA' : '#FAF3F3')};
    border: none;
    &:hover {
        background-color: '#E1E5EA';
    }
`;
const Apply = styled.button`
    border: none;
    padding: 12px 15px;
    margin-left: 70%;
    background-color: #e1e5ea;
    cursor: pointer;
    &:hover {
        background-color: #faf3f3;
    }
`;
export default FontStyler;
