import { ReactNode, forwardRef, useImperativeHandle, useState } from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';

interface IModalProps {
    children: ReactNode;
    contentLabel: string;
    className?: string;
    title?: string;
}

Modal.setAppElement('#root');

export const ModalWindow = forwardRef((props: IModalProps, ref) => {
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    const classes = `absolute rounded-lg p-8 bg-white shadow-lg ${props.className}`;

    useImperativeHandle(ref, () => ({
        handleModalOpen() {
            setModalIsOpen(true);
        },
        handleModalClose() {
            setModalIsOpen(false);
        }
    }));

    function closeModal() {
        setModalIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            bottom: 'auto',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    };

    return (
        <Modal
            isOpen={ModalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={props.contentLabel}
            className={classes}
            overlayClassName='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
        >
            <div className='flex justify-between items-center'>
                <h1 className='mb-4 text-lg font-semibold'>{props.title}</h1>
                <MdClose
                    className='text-red-500 font-semibold text-xl cursor-pointer'
                    onClick={closeModal}
                />
            </div>
            {props.children}
        </Modal>
    )
});