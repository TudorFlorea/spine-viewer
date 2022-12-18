import "./ActionPanelContent.css";

interface ActionPanelContentProps {
    title?: string;
    children?: JSX.Element | JSX.Element[] | null;
}

const ActionPanelContent: React.FC<ActionPanelContentProps> = ({ title, children }) => {

    return (
        <div className="action-panel-content">
            <h2 className="action-panel-heading">{title}</h2>
            {children}
        </div>
    );
};


export default ActionPanelContent;
