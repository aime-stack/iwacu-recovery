interface SuccessMessageProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

export default function SuccessMessage({ isVisible, message, onClose }: SuccessMessageProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 px-6 rounded-xl bg-[#57241B] text-white font-semibold hover:bg-[#6d2c21] transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}