import { toast } from 'react-toastify';
import './../../styles/error.css';

function ErrorMessage({ message, onDismiss }) {
  const handleDismiss = () => {
    if (onDismiss) onDismiss();
    toast.dismiss();
  };

  return (
    <div className="error-message fade-in">
      <p>{message || 'An error occurred. Please try again.'}</p>
      <button onClick={handleDismiss} className="dismiss-btn">
        Dismiss
      </button>
    </div>
  );
}

export default ErrorMessage;