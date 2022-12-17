import Button from "../../base/Button";
import "./LoadDefaultSpineButton.css";

interface LoadDefaultSpinButtonProps {
    onClick: () => void;
}

const LoadDefaultSpinButton: React.FC<LoadDefaultSpinButtonProps> = ({onClick}) => {
    return (
        <Button 
            onClick={onClick}
            label="Load Spine Boy Pro spine"
            className="load-default-spine-button"
        />
    )
};

export default LoadDefaultSpinButton;