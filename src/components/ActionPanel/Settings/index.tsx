import { ColorResult } from "react-color";
import { useSettingsStore } from "../../../store";
import ColorPicker from "../../base/ColorPicker";
import "./Settings.css";

const Settings = () => {

    const { canvasBackground, setCanvasBackground } = useSettingsStore(store => {
        return {
            canvasBackground: store.canvasBackground,
            setCanvasBackground: store.setCanvasBackground
        }
    });

    const handleColorChange = (color: ColorResult) => {
        setCanvasBackground(color.hex);
    };

    return (
        <div className="action-panel-content">
            <h2 className="action-panel-heading">Settings</h2>

            <div className="setting">
                <span className="setting__text">Canvas color</span>
                <ColorPicker color={canvasBackground} handleColorChange={handleColorChange} />
            </div>


        </div>
    )
}

export default Settings;