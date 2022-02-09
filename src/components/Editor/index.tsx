import React, { useState, useEffect, forwardRef, useCallback } from 'react';

import { EditorElementName, EditorElementProp, FontFamily, FontStyle } from 'types';
import rectButtonIcon from 'images/editor-rectangular.png';
import colorButtonIcon from 'images/editor-color.png';
import textButtonIcon from 'images/editor-text.png';
import forwardButtonIcon from 'images/editor-forward.png';
import backwardButtonIcon from 'images/editor-backward.png';
import increaseEditorIcon from 'images/editor-increase.png';
import decreaseEditorIcon from 'images/editor-decrease.png';
import deleteIcon from 'images/editor-trash.png';
import fontStylingIcon from 'images/editor-font-styling.png';
import { EditorContainer, ToolBar, EditorButton, EditArea } from 'style';
import { initialImageStyle, initialRectStyle, initialTextStyle } from 'constant/editor-initial-state';
import EditorElement from 'components/EditorElement';

type Props = {
    elements: EditorElementProp[];
    setElements: Function;
    editorImageState: string[];
    editorRef: React.MutableRefObject<HTMLDivElement | null>;
    editorHeight: number;
    saveEditorHeight: (flag: boolean) => void;
};

const Editor = ({ elements, setElements, editorImageState, editorRef, editorHeight, saveEditorHeight }: Props) => {
    const [currentElements, setCurrentElements] = useState<Array<HTMLElement | null>>([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showFontStyler, setShowFontStyler] = useState(false);
    const [isDoubleClicked, setIsDoubleClicked] = useState(false);
    const [color, setColor] = useState('#000');
    const [fontStyles, setFontStyles] = useState<FontStyle>({
        align: 'LEFT',
        fontSize: 14,
        fontFamily: 'Montserrat',
    });
    const [elementCount, setElementCount] = useState({
        any: elements.length,
        img: elements.filter((element) => element.tagName === 'IMAGE').length,
    });
    const maxAnyElementCount = 35;
    const maxImgElementCount = 10;

    useEffect(() => {
        currentElements.forEach((elem) => {
            if (!elem) return;
            if (elem.classList.contains('RECTANGULAR')) elem.style.backgroundColor = color;
            if (elem.classList.contains('TEXT')) elem.style.color = color;
        });
    }, [color]);

    useEffect(() => {
        if (editorImageState.length === 0) return;
        if (elementCount.any + 1 > maxAnyElementCount || elementCount.img + 1 > maxImgElementCount) {
            console.log('요소 개수 초과');
            return;
        }
        setElementCount({ any: ++elementCount.any, img: ++elementCount.img });
        const element: EditorElementProp = {
            id: makeNewId() || 0,
            tagName: EditorElementName.image,
            style: initialImageStyle,
            image: editorImageState[editorImageState.length - 1],
        };
        setElements([...elements, element]);
    }, [editorImageState]);

    useEffect(() => {
        currentElements.forEach((elem) => {
            if (!elem) return;
            if (elem.classList.contains('TEXT')) {
                elem.style.setProperty('font-family', fontStyles.fontFamily);
                elem.style.setProperty('font-size', fontStyles.fontSize + 'px');
                elem.style.setProperty('text-align', fontStyles.align);
            }
        });
    }, [JSON.stringify(fontStyles)]);

    useEffect(() => {
        if (!editorRef.current) return;
        editorRef.current.addEventListener('click', (e: any) => {
            if (!(e.target as HTMLDivElement).classList.contains('editorElement')) {
                keyToCurrentElements([]);
            }
        });
        // return () => {
        //     setEditorImageState([]);
        // };
    }, []);

    const makeNewId = () => elements.reduce((acc, elem) => (elem.id > acc ? elem.id : acc), -1) + 1;
    const createRectangular = () => {
        if (elementCount.any + 1 > maxAnyElementCount) return console.log('요소 개수 초과');
        setElementCount({ ...elementCount, any: ++elementCount.any });
        const element: EditorElementProp = {
            id: makeNewId() || 0,
            tagName: EditorElementName.rectangular,
            style: initialRectStyle,
        };
        setElements([...elements, element]);
    };

    const onClickColorButton = () => {
        setShowColorPicker((prev) => !prev);
    };
    const mirrorCurrentFontStyle = () => {
        currentElements.forEach((elem) => {
            if (!elem) return;
            if (elem.classList.contains('TEXT')) {
                setFontStyles({
                    fontSize: parseInt(elem.style.fontSize) || 14,
                    fontFamily: (elem.style.fontFamily as FontFamily) || 'Montserrat',
                    align: (elem.style.textAlign as 'LEFT' | 'CENTER' | 'RIGHT') || 'LEFT',
                });
            }
        });
    };
    const deleteElement = () => {
        if (!currentElements) return;
        setElements(() => elements.filter((el) => el.id !== Number(currentElements[0]?.id)));
        setCurrentElements([]);
        currentElements[0]?.classList.contains('IMAGE')
            ? setElementCount({ any: --elementCount.any, img: --elementCount.img })
            : setElementCount({ any: --elementCount.any, img: elementCount.img });
    };
    const onFontStylerButton = () => {
        mirrorCurrentFontStyle();
        setShowFontStyler((prev) => !prev);
    };
    const createText = () => {
        if (elementCount.any + 1 > maxAnyElementCount) return console.log('요소 개수 초과');

        setElementCount({ ...elementCount, any: ++elementCount.any });
        const element: EditorElementProp = {
            id: makeNewId() || 0,
            tagName: EditorElementName.text,
            style: initialTextStyle,
        };
        setElements([...elements, element]);
    };
    const changeFontStyles = (newFontStyle: FontStyle) => {
        setFontStyles(newFontStyle);
    };
    const keyToCurrentElements = (keyArr: Array<HTMLElement | null>) => {
        setCurrentElements(keyArr);
        setIsDoubleClicked(false);
    };
    const setIsDoubleClickedFunc = (check: boolean) => {
        setIsDoubleClicked(check);
    };

    const onClickZIndexButton = (direction: string) => {
        return () => {
            currentElements.forEach((elem) => {
                if (!elem) return;
                const z = elem.style.zIndex;
                if (direction === 'FORWARD') elem.style.zIndex = `${+z + 10}`;
                else elem.style.zIndex = `${+z - 10 < 0 ? 0 : +z - 10}`;
            });
        };
    };

    const renderElements = () => {
        return elements.map((element) => {
            if (element.tagName)
                return (
                    <EditorElement
                        key={element.id}
                        idx={element.id}
                        style={element.style}
                        currentElements={currentElements}
                        keyToCurrentElements={keyToCurrentElements}
                        tagName={element.tagName}
                        image={element.image}
                        text={element.innerHTML}
                        artworkId={element.artworkId}
                        isDoubleClicked={isDoubleClicked}
                        setIsDoubleClickedFunc={setIsDoubleClickedFunc}
                    ></EditorElement>
                );
        });
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            deleteElement();
        }
    };

    return (
        <EditorContainer height={editorHeight}>
            <ToolBar>
                <EditorButton onClick={createRectangular} bg={rectButtonIcon} />
                <EditorButton onClick={onClickColorButton} bg={colorButtonIcon} />
                <EditorButton onClick={createText} bg={textButtonIcon} />
                <EditorButton onClick={onClickZIndexButton('FORWARD')} bg={forwardButtonIcon} />
                <EditorButton onClick={onClickZIndexButton('BACKWARD')} bg={backwardButtonIcon} />
                <EditorButton onClick={() => saveEditorHeight(true)} bg={increaseEditorIcon} />
                <EditorButton onClick={() => saveEditorHeight(false)} bg={decreaseEditorIcon} />
                <EditorButton onClick={onFontStylerButton} bg={fontStylingIcon} />
                <EditorButton onClick={deleteElement} bg={deleteIcon} />
                {/* {showColorPicker && (
          <ColorPicker
            color={color}
            handleColor={(color) => {
              setColor(color)
            }}
          />
        )} */}
                {/* {showFontStyler && (
          <FontStyler
            fontStyle={fontStyles}
            changeFontStyle={changeFontStyles}
          />
        )} */}
            </ToolBar>
            <EditArea height={editorHeight} ref={editorRef} onKeyDown={onKeyDown} tabIndex={0}>
                {renderElements()}
            </EditArea>
        </EditorContainer>
    );
};

export default Editor;
