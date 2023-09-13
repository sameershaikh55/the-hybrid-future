import React, { useState } from "react";
import { ModalProps } from "./types";
import styles from "./style.module.scss";
import { useRouter } from "next/router";

const ConfirmLogoutModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 300);
  };

  const logout = () => {
    router.push("/login");
    sessionStorage.clear();
  };

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.open : ""} ${
        isAnimating ? styles.animating : ""
      }`}
    >
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.content}>
        <div className={styles.header}>
          <h5 className="fw600">Log out?</h5>
          <button className={styles.closeButton} onClick={handleClose}>
            <img src="/assets/cross.svg" alt="" />
          </button>
        </div>
        <div className={styles.body}>
          <p>If you leave now, your answers won’t be saved.</p>
          <div className={`${styles.actions} mt-5 d-flex gap-3`}>
            <button onClick={logout}>Yes, leave</button>
            <button onClick={handleClose}>No, stay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
