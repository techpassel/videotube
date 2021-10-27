import React from 'react'
import FileUpload from './file-upload/fileUpload'

const ImageUpload = ({multiple, uploadImage}) => {
    return (
        <div>
            <FileUpload multiple={multiple} validType='image' uploadFiles={uploadImage} />
        </div>
    )
}

export default ImageUpload
