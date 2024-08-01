import { useNavigate } from "react-router-dom";

interface propsTypes {
  message: string;
  direction: string;
}

const ChangePassword = ({ message, direction }: propsTypes) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(direction);
  };
  return (
    <div>
      <button className="whitespace-nowrap text-xs" onClick={handleNavigation}>
        {message}
      </button>
    </div>
  );
};
export default ChangePassword;
