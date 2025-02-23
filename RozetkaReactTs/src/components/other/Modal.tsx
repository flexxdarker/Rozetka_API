import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode; // Дозволяємо передавати будь-який компонент або елемент
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Якщо модальне вікно закрите, не рендеримо нічого

    // Функція для закриття модалки, якщо клікнули поза її межами
    const handleBackgroundClick = (e: React.MouseEvent) => {
        // Перевіряємо, чи клікнули поза вікном модалки
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[100]"
            onClick={handleBackgroundClick} // Додаємо обробник кліка
        >
            {children}
        </div>
    );
};

export default Modal;