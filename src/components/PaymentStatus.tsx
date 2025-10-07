"use client";

import { motion, AnimatePresence } from 'framer-motion';

interface PaymentStatusProps {
  isVisible: boolean;
  status: 'processing' | 'success' | 'error';
  message: string;
  onClose?: () => void;
}

export default function PaymentStatus({ isVisible, status, message, onClose }: PaymentStatusProps) {
  const statusStyles = {
    processing: {
      icon: '⏳',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-300'
    },
    success: {
      icon: '✅',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-300'
    },
    error: {
      icon: '❌',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-300'
    }
  };

  const { icon, bgColor, textColor, borderColor } = statusStyles[status];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed inset-x-0 top-4 mx-auto max-w-md z-50 px-4`}
        >
          <div 
            className={`${bgColor} ${textColor} p-4 rounded-lg shadow-lg border ${borderColor} relative`}
          >
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            )}
            <div className="flex items-center space-x-3">
              <span className="text-xl">{icon}</span>
              <div>
                <h3 className="font-semibold capitalize">{status}</h3>
                <p className="text-sm mt-1">{message}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}