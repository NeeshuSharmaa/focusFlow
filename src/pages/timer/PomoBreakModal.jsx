import { useSelector } from "react-redux";

export default function PomoBreakModal({
  setBreakModal,
  setTime,
  initialTime,
}) {
  const breakLength = useSelector((state) => state.settings.breakLength);
  return (
    <div className="modal">
      <div className="modal-main">
        <span>Do you want to take {breakLength} mins break?</span>
        <div className="actions">
          <span>Yes</span>
          <span
            onClick={() => {
              setBreakModal(false);
              setTime(initialTime);
            }}
          >
            Continue focusing
          </span>
        </div>
      </div>
    </div>
  );
}
