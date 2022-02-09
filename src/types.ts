export enum EditorElementName {
    rectangular = 'RECTANGULAR',
    text = 'TEXT',
    image = 'IMAGE',
}
export type EditorElementType = 'RECTANGULAR' | 'TEXT' | 'IMAGE';
export type EditorElementStyle = {
    top: number;
    left: number;
    transform?: string;
    color?: string;
    backgroundColor?: string;
    width: number | string;
    height: number | string;
    zIndex: number;
    position: 'absolute' | 'flex';
    fontFamily?: FontFamily;
    textAlign?: 'LEFT' | 'CENTER' | 'RIGHT';
    fontSize?: number;
};

export type EditorElementProp = {
    id: number;
    tagName: EditorElementType;
    style: EditorElementStyle;
    image?: string;
    innerHTML?: string;
    imageSrc?: string;
    artworkId?: string;
};
export type FontFamily = 'Montserrat' | 'Noto Sans KR';

export type FontStyle = {
    align: 'LEFT' | 'CENTER' | 'RIGHT';
    fontSize: number;
    fontFamily: FontFamily;
};
