import "./SpineLoaderInfoText.css";

interface SpineLoaderInfoTextProps {
    text: string;
}

const SpineLoaderInfoText: React.FC<SpineLoaderInfoTextProps> = ({text}) => {
    return (
        <h2 className="spine-loader-info-text">{text}</h2>
    )
};

export default SpineLoaderInfoText;