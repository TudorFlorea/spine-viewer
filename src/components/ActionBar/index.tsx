import { useSpineViewerStore } from "../../store";
import ActionPanel from "../ActionPanel";
import Animations from "../ActionPanel/Animations";
import Debug from "../ActionPanel/Debug";
import Mixins from "../ActionPanel/Mixins";
import Settings from "../ActionPanel/Settings";
import Skins from "../ActionPanel/Skins";
import Timeline from "../ActionPanel/Timeline";
import "./ActionBar.css";
import ActionItems from "./ActionItems";
import SettingsButton from "./SettingsButton";


interface ActionBarProps { }

const getCurrentPanel = (key: string): JSX.Element | null => {

    switch (key) {
        case "animations":
            return <Animations />;

        case "skins":
            return <Skins />;

        case "debug":
            return <Debug />;

        case "mixins":
            return <Mixins />;

        case "timeline":
            return <Timeline />;

        case "settings":
            return <Settings />;

        default:
            return null;
    }
}

const ActionBar: React.FC<ActionBarProps> = () => {
    const [selectedActionMenuItem, actionMenuItems, setMenuItem] = useSpineViewerStore(store => [
        store.selectedActionMenuItem,
        store.actionMenuItems,
        store.setMenuItem
    ]);

    let panelContent = null;

    if (selectedActionMenuItem !== null) {
        panelContent = getCurrentPanel(selectedActionMenuItem.name);
    }

    const handleSettingsClick = () => {
        setMenuItem("settings");
    }


    return (
        <>
            <div className="action-bar">
                <ActionItems items={actionMenuItems} selectedItem={selectedActionMenuItem} />
                <SettingsButton onClick={handleSettingsClick} />
            </div>
            <ActionPanel open={selectedActionMenuItem !== null}>
                {selectedActionMenuItem && getCurrentPanel(selectedActionMenuItem.name)}
            </ActionPanel>
        </>

    )
};

export default ActionBar;