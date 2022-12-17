import { toast } from "react-toastify";
import { copyToClipboard } from "../../../../utils/copyUtil";
import Button from "../../../base/Button";
import "./AnimationButton.css";

interface AnimationButtonProps {
    label: string;
    onClick: () => void
}

const AnimationButton: React.FC<AnimationButtonProps> = ({ label, onClick }) => {

    const handleCopyClick = () => {
        copyToClipboard(label);
        console.log("copied: ", label);
        toast(`Copied to clipboard: ${label}`);
    };

    return (
        <div className="animation-button-wrapper">
            <Button className="animation-button" label={label} onClick={onClick} />
            <span onClick={handleCopyClick} className="animation-copy">
                <img src="/assets/images/copy_small.png" />
            </span>
        </div>
    )
};

export default AnimationButton;