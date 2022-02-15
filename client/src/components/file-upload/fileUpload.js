import React, { useRef, useState, useEffect } from 'react'
import './fileUpload.css'
import Modal from '../modal/modal.js'

const FileUpload = (props) => {
    const fileInputRef = useRef();
    const modalImageRef = useRef();
    const modalRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileLengthError, setFileLengthError] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        let filteredArr = selectedFiles.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        setValidFiles([...filteredArr]);
    }, [selectedFiles]);

    const preventDefault = (e) => {
        e.preventDefault();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }

    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (!props.multiple && files.length > 1) {
            setFileLengthError(true);
        } else {
            setFileLengthError(false);
            if (files.length) {
                handleFiles(files);
            }
        }
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (!validateFile(files[i])) {
                files[i]['invalid'] = true;
                setErrorMessage('File type not permitted');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
            if (props.multiple) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                setSelectedFiles([...files])
            }
        }
    }

    const validateFile = (file) => {
        const validType = props.validType ? props.validType : 'image';
        if (!file.type.includes(validType)) return false;

        return true;
    }

    const fileSize = (size) => {
        if (size === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name) => {
        const index = validFiles.findIndex(e => e.name === name);
        const index2 = selectedFiles.findIndex(e => e.name === name);
        const index3 = unsupportedFiles.findIndex(e => e.name === name);
        validFiles.splice(index, 1);
        selectedFiles.splice(index2, 1);
        setValidFiles([...validFiles]);
        setSelectedFiles([...selectedFiles]);
        if (index3 !== -1) {
            unsupportedFiles.splice(index3, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }

    const openImageModal = (file) => {
        const reader = new FileReader();
        modalRef.current.style.display = "block";
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
        }
    }

    const previewVideoModal = (file) => {
        setVideoUrl(URL.createObjectURL(file))
        setShowVideoModal(true);
    }

    const closeVideoModal = () => {
        setShowVideoModal(false);
        setVideoUrl('');
    }

    const closeModal = () => {
        modalRef.current.style.display = "none";
        modalImageRef.current.style.backgroundImage = 'none';
    }

    const uploadFiles = () => {
        props.uploadFiles(validFiles);
    }

    return (
        <>
            <div className="upload-container">
                {unsupportedFiles.length === 0 && validFiles.length ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Upload {props.multiple ? 'Files' : 'File'}</button> : ''}
                {fileLengthError ? <p>Please upload only one file at a time.</p> : ''}
                {unsupportedFiles.length ? <p>Please remove all unsupported files.</p> : ''}
                <div className="drop-container"
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                    onClick={fileInputClicked}
                >
                    <div className="drop-message">
                        <div className="upload-icon"></div>
                        Drag & Drop {props.multiple ? 'Files' : 'File'} here or click to select file(s)
                    </div>
                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple={props.multiple ? true : false}
                        onChange={filesSelected}
                    />
                </div>
                <div className="file-display-container">
                    {
                        validFiles.map((data, i) =>
                            <div className="file-status-bar" key={i}>
                                <div onClick={!data.invalid ? () => { props.validType === "image" ? openImageModal(data) : previewVideoModal(data) } : () => removeFile(data.name)}>
                                    <div className="file-type-logo"></div>
                                    <div className="file-type">{fileType(data.name)}</div>
                                    <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                                    <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                                </div>
                                <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="modal" ref={modalRef}>
                <div className="overlay"></div>
                <span className="close" onClick={(() => closeModal())}>X</span>
                <div className="modal-image" ref={modalImageRef}></div>
            </div>
            <Modal show={showVideoModal} handleClose={closeVideoModal}>
                <video className="video-player" loop autoPlay={true} src={videoUrl} controls />
            </Modal>
        </>
    )   
}

export default FileUpload;
