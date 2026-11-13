
function Skeleton() {
  return (
    <div
      className="skeleton-container"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading person details"
    >
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
    </div>
  );
}

export default Skeleton;
