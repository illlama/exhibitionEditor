import React from 'react';

type Props = {
    changeEditorWidth: (w: number) => void;
    addImg: (img: HTMLImageElement) => void;
    deleteImg: (idx: number) => void;
};
const AssetController = ({ changeEditorWidth, addImg, deleteImg }: Props) => {
    return <div>AssetController</div>;
};

export default AssetController;
