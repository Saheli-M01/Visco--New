import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onCancel, onConfirm, confirmLabel = 'Continue', cancelLabel = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-96" style={{ zIndex: 10000 }}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 rounded bg-gray-200" onClick={onCancel}>{cancelLabel}</button>
          <button className="px-3 py-1 rounded bg-red-500 text-white" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
