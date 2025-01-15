import React from 'react';
import '../../assets/styles/ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onDelete, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="confirm-delete-modal">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete {itemName}?</p>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="delete-btn" onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
