import { useEffect, useRef } from 'react';
import './modal.css';

const Modal = ({ show, handleClose, children }) => {
    const modalRef = useRef();
    useEffect(() => {
        if (show) {
            modalRef.current.style.display = "block";
        } else {
            modalRef.current.style.display = "none";
        }
    }, [show])
    return (
        <div ref={modalRef} className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                {children}
            </div>

        </div>
    );
};

export default Modal;