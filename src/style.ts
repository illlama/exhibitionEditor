import styled from '@emotion/styled';

interface EditorProps {
    height: number;
    width: number;
}

export const Button = styled.button`
    height: 30px;
    padding: 0px 5px;
    border: none;
    border-bottom: 1px solid #111;
    background: none;
    font-size: 20px;
    font-weight: 200;
`;

export const EditorContainer = styled.div<EditorProps>`
    width: 100%;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    border: 1px solid #c2c2c2;
    overflow: hidden;
    margin: 0 auto;
`;
export const ToolBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #c2c2c2;
    position: relative;
    padding-left: 30px;
`;
export const EditorButton = styled.button<{ bg: string }>`
    width: 32px;
    height: 100%;
    background: url(${(props) => props.bg});
    background-repeat: no-repeat;
    background-position: center;
    border: none;

    &:hover {
        border-bottom: 2px solid black;
    }
`;

export const EditArea = styled.div<EditorProps>`
    position: relative;
    overflow: hidden;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    &:focus-visible {
        outline: none;
    }
`;
