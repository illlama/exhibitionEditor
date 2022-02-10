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

const App = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [editorHeight, setEditorHeight] = useState(1000);
    const [editorWidth, setEditorWidth] = useState(1200);
    const [editorImageState, setEditorImageState] = useState<string[]>([]);
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const [imgList, setImgList] = useState<string[]>([]);
    const setElementList = (elementList: EditorElementProp[]) => {
        setElements(elementList);
    };
    const addEditorImageState = (image: string) => {
        setEditorImageState([...editorImageState, image]);
    };
    const saveEditorHeight = (flag: boolean) => {
        setEditorHeight((prev) =>
            flag ? prev + diffSizeOfGap : prev - diffSizeOfGap < 400 ? 400 : prev - diffSizeOfGap,
        );
    };
    const changeEditorWidth = (w: number) => {
        setEditorWidth(w > 3000 ? 3000 : w);
    };
    const addImg = (img: string) => {
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
                <AssetController
                    editorWidth={editorWidth}
                    imgList={imgList}
                    addEditorImageState={addEditorImageState}
                    changeEditorWidth={changeEditorWidth}
                    addImg={addImg}
                    deleteImg={deleteImg}
                />
                <Editor
                    elements={elements}
                    setElements={setElementList}
                    editorImageState={editorImageState}
                    editorRef={editorRef}
                    editorWidth={editorWidth}
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
