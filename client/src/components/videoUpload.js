import React from 'react'
import FileUpload from './file-upload/fileUpload'

const VideoUpload = ({ uploadVideo }) => {
    return (
        <div>
            <FileUpload multiple={false} validType='video' uploadFiles={uploadVideo} />
        </div>
    )
}

export default VideoUpload
