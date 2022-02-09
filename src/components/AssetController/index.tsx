import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Button } from 'style';
import ImageSlider from './ImageSlider';

type Props = {
    editorWidth: number;
    imgList: string[];
    addEditorImageState: (image: string) => void;
    changeEditorWidth: (w: number) => void;
    addImg: (img: string) => void;
    deleteImg: (idx: number) => void;
};
const AssetController = ({
    editorWidth,
    imgList,
    addEditorImageState,
    changeEditorWidth,
    addImg,
    deleteImg,
}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    let src = '';
    const fileReader = new FileReader();
    const onChangeFile = () => {
        fileReader.onload = (e) => {
            src = e.target!.result as string;
            src && addImg(src);
        };
        fileReader.readAsDataURL(inputRef.current!.files![0]);
    };
    return (
        <Container>
            <Controller>
                <div>
                    <label>Editor Width</label>
                    <input
                        type="number"
                        value={editorWidth}
                        onChange={(e) => changeEditorWidth(parseInt(e.target.value))}
                    />
                </div>
                <AddImageLabel>
                    <label htmlFor="input-file">이미지 업로드</label>
                </AddImageLabel>
                <AddImage type="file" id="input-file" ref={inputRef} accept="image/*" onChange={onChangeFile} />
                <ImageSlider imgList={imgList} addEditorImageState={addEditorImageState} />
            </Controller>
        </Container>
    );
};
const Container = styled.div`
    text-align: center;
    padding: 0 10%;
    margin-top: 50px;
    margin-bottom: 50px;
`;
const Controller = styled.div`
    text-align: left;
    input {
        margin-left: 10px;
    }
`;
const AddImageLabel = styled.div`
    font-size: 21px;
    margin: 20px 0;
    label {
        cursor: pointer;
        border-bottom: 1px solid #000;
        &:hover {
            color: #da7f8f;
            border-bottom: 1px solid #da7f8f;
        }
    }
`;
const AddImage = styled.input`
    display: none;
`;

export default AssetController;
