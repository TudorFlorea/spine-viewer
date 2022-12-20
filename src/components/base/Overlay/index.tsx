import "./Overlay.css";

interface OverlayProps {
    children?: JSX.Element | JSX.Element[] | null;
}

const Overlay: React.FC<OverlayProps> = ({children}) => {
    return (
        <div className="overlay">
            {children}
        </div>
    );
}

export default Overlay;