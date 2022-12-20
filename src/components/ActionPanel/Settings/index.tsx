import { ColorResult } from "react-color";
import { useSettingsStore } from "../../../store";
import ColorPicker from "../../base/ColorPicker";
import ActionPanelContent from "../common/ActionPanelContent";
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
        <ActionPanelContent title="Settings">
            <div className="setting">
                <span className="setting__text">Canvas color</span>
                <ColorPicker color={canvasBackground} handleColorChange={handleColorChange} />
            </div>
        </ActionPanelContent>
    )
}

export default Settings;