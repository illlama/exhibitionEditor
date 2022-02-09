import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

import { EditorElementProp } from 'types';
import Editor from 'components/Editor';
import { Button } from 'style';
import Description from 'components/Description';
import Footer from 'components/Footer';
import AssetController from 'components/AssetController';

type EditorProp = {
    handleBackButton: () => void;
    holdExhibition: (content: string, size: string, artworkIds: string, isEdit: string | undefined) => void;
    elements: EditorElementProp[];
    setElementList: (elementList: EditorElementProp[]) => void;
    isEdit: boolean;
    saveEditorSize: (flag: boolean) => void;
    editorSize: number;
};
type ExhibitionElement = {
    tagName: string;
    innerHTML?: string | null;
    imageSrc?: string | null;
    artworkId?: string;
    style: {
        [key: string]: string;
    };
};

const getExhibitionElementsDetail = (el: ChildNode) => {
    const element = el as HTMLElement;
    const tagName = element.classList[1];
    const { width, height, color, transform, backgroundColor } = element.style;
    const { top, left, zIndex, backgroundImage, fontFamily, fontSize, textAlign } = window.getComputedStyle(element);
    let imageSrc = null;
    if (element.classList.contains('IMAGE')) {
        imageSrc = backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    }
    const artworkId = element.dataset.artwork;

    const innerHTML = (tagName === 'TEXT' && element.children[0].innerHTML) || null;

    return {
        width,
        height,
        color,
        transform,
        backgroundColor,
        top,
        left,
        zIndex,
        fontFamily,
        fontSize,
        textAlign,
        tagName,
        imageSrc,
        artworkId,
        innerHTML,
    };
};

const App = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [editorHeight, setEditorHeight] = useState(1000);
    const [editorWidth, setEditorWidth] = useState(700);
    const [imgList, setImgList] = useState<HTMLImageElement[]>([]);
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const setElementList = (elementList: EditorElementProp[]) => {
        setElements(elementList);
    };
    const saveEditorHeight = (flag: boolean) => {
        setEditorHeight((prev) => (flag ? prev + diffSizeOfGap : prev - diffSizeOfGap));
    };
    const changeEditorWidth = (w: number) => {
        setEditorWidth(w);
    };
    const addImg = (img: HTMLImageElement) => {
        setImgList((prev) => [...prev, img]);
    };
    const deleteImg = (idx: number) => {
        setImgList((prev) => prev.filter((img, i) => i !== idx));
    };
    const diffSizeOfGap = 300;

    return (
        <>
            <Container>
                <Description />
                <AssetController changeEditorWidth={changeEditorWidth} addImg={addImg} deleteImg={deleteImg} />
                <Editor
                    elements={elements}
                    setElements={setElementList}
                    editorRef={editorRef}
                    editorHeight={editorHeight}
                    saveEditorHeight={saveEditorHeight}
                />
                {/* <Button>Save</Button> */}
            </Container>
            <Footer />
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: relative;
`;

export default App;
