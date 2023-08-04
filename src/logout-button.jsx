import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

export function LogoutButton() {
  function handleClick() {
    sessionStorage.clear();
    console.log(sessionStorage);
    window.location.reload(false);
  }

  return (
    <button className="btn navbar-btn" onClick={handleClick}>
      <span className="btn-icon">
        <FontAwesomeIcon icon={faDoorOpen} />
      </span>
      <span className="btn-text">Logout</span>
    </button>
  );
}
