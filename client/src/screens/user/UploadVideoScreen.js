import React, { useEffect, useState } from 'react'
import './UserScreen.css'
import StepProgressBar from 'react-step-progress';
import './react-step-progess-custom.css'
import VideoUpload from '../../components/videoUpload';
import ImageUpload from '../../components/imageUpload';

const UploadVideoScreen = () => {
    const [video, setVideo] = useState();
    const [thumbnail, setThumbnail] = useState();
    const uploadVideo = (files) => {
        /*
            Here we are setting value for video state. But it won't be updated immediately as
            React this.setState, and useState does not make changes directly to the state object.
            Actually they just create queues for React core to update the state object.
            So we should use useState() as it will get trigger automatically when React core will 
            actualy update the state object.And then we will send request on server to store the video on server.  
        */
        setVideo(files[0]);
    }

    const uploadThumbnail = (files) => {
        setThumbnail(files[0]);
    }

    const onFormSubmit = () => {
        console.log("Form submission completed.");
    }

    const previousBtn = ""

    const step1Content = <div className="file-upload-content">
        <h3>Upload Video</h3>
        <VideoUpload uploadVideo={uploadVideo} />
    </div>
    const step2Content = <div className="file-upload-content">
        <h3>Upload Thumbnail</h3>
        <ImageUpload multiple={false} uploadImage={uploadThumbnail} />
    </div>
    const step3Content = <div className="file-upload-content">
        <h3>Enter Details</h3>
    </div>

    useEffect(() => {
        if (video > 0) {
            console.log(video, "video");
        }
    }, [video])

    useEffect(() => {
        if (thumbnail > 0) {
            console.log(thumbnail, "thumbnail");
        }
    }, [thumbnail])

    const isVideoUploaded = video ? true : false;
    const isThumbnailUploaded = thumbnail ? true : false;

    return (
        <div className="container">
            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                primaryBtnClass="video-screen-btn"
                secondaryBtnClass="video-screen-btn"
                steps={[
                    {
                        label: 'Upload video',
                        name: 'step 1',
                        content: step1Content
                    },
                    {
                        label: 'Upload thumbnail',
                        name: 'step 2',
                        content: step2Content
                    },
                    {
                        label: 'Enter Details',
                        name: 'step 3',
                        content: step3Content
                    }
                ]}
            />
        </div>
    )
}

export default UploadVideoScreen
