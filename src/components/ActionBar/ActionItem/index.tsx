interface ActionItemProps {
    icon: string;
    name: string;
    label: string;
    selected: boolean;
    onClick: (menuName: string) => void;
}

const ActionItem: React.FC<ActionItemProps> = ({ name, icon, label, selected, onClick }) => {

    const className = `action-bar__action-item ${selected ? "action-bar__action-item--selected" : ""}`;

    return (
        <div className={className} onClick={() => onClick(name)}>
            <img className="action-item__icon" src={icon} alt={`${label} icon`} />
            <p className="action-item__label">{label}</p>
        </div>
    );
};

export default ActionItem;