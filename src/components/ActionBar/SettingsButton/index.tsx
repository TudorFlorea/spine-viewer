import ActionItem from "../ActionItem";

interface SettingsButtonProps {
    onClick: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {

    return (
        <div className="action-bar__settings">
            <ActionItem
                selected={false}
                name="settings"
                label="Settings"
                icon="/assets/svg/settings.svg"
                onClick={onClick}
            />
        </div>
    )

};

export default SettingsButton;