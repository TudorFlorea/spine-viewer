import Checkbox from "../../../base/Checkbox";
import "./PanelCheckbox.css";

interface PanelCheckboxProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const PanelCheckbox: React.FC<PanelCheckboxProps> = ({ checked, onChange, label }) => {

    return (
        <div className="action-panel__checkbox">
            <span>{label}</span>
            <Checkbox onChange={onChange} checked={checked} />
        </div>
    );
};

export default PanelCheckbox;