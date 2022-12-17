import "./ActionPanel.css";

interface ActionPanelProps {
    children: JSX.Element | JSX.Element[] | null;
    open: boolean;
}

const ActionPanel: React.FC<ActionPanelProps> = (props) => {
    const { children, open } = props;

    const className = `action-bar__action-panel ${open ? "action-bar__action-panel--open" : ''}`

    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default ActionPanel;