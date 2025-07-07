import '../styles/ErrorMessage.scss';

type ErrorMessageProps = {
  message: string | null;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="error-message">
      <div className="error-icon">!</div>
      <div className="error-text">{message}</div>
    </div>
  );
}
