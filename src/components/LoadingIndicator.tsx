import './LoadingIndicator.scss';

export default function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div className="loading-spinner"></div>
      <div className="loading-text">Načítání...</div>
    </div>
  );
}
