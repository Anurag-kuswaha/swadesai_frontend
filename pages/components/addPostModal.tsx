import React from 'react';
import styles from '../../styles/Modal.module.css';

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  setBlogTitle: (value: string) => void;
  setBlogContent: (value: string) => void;
}

const AddPostModal: React.FC<AddPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  setBlogTitle,
  setBlogContent,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Add New Post</h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className='row'>
          <div className='col-12'>
          <input
            type="text"
            className={styles.input}
            placeholder="Title"
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          </div>
          <div className='col-12'>
          <textarea
            className={styles.textarea}
            placeholder="Content"
            onChange={(e) => setBlogContent(e.target.value)}
          ></textarea>
          </div>
          </div>
        
       
          <button className={styles.button} type="submit" style={{
                        backgroundColor:'#1D5E6D',
                        borderColor:'#1D5E6D'
                    }}>Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
