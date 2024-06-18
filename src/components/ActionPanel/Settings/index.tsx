import { ColorResult } from "react-color";
import { useSettingsStore } from "../../../store";
import ColorPicker from "../../base/ColorPicker";
import ActionPanelContent from "../common/ActionPanelContent";
import "./Settings.css";
import Checkbox from "../../base/Checkbox";

const Settings = () => {

    const { canvasBackground, showStats, setShowStats, setCanvasBackground } = useSettingsStore(store => {
        return {
            canvasBackground: store.canvasBackground,
            setCanvasBackground: store.setCanvasBackground,
            showStats: store.showStats,
            setShowStats: store.setShowStats
        }
    });

    const handleColorChange = (color: ColorResult) => {
        setCanvasBackground(color.hex);
    };

    const handleShowStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowStats(e.target.checked);
    };

    return (
        <ActionPanelContent title="Settings">
            <div className="setting">
                <span className="setting__text">Canvas color</span>
                <ColorPicker color={canvasBackground} handleColorChange={handleColorChange} />
            </div>
            <div className="setting">
                
            </div>
            <div className="setting">
                    <span className="setting__text">Show stats</span>
                    <Checkbox checked={showStats} onChange={handleShowStatsChange} />
                </div>
        </ActionPanelContent>
    )
}

export default Settings;