import { useState } from "react";
import events from "../../../events";
import { useSpineViewerStore } from "../../../store";
import PanelCheckbox from "../PanelCheckbox";
import AnimationButton from "../common/AnimationButton";


const Skins = () => {

    const skins = useSpineViewerStore(store => store.skins);

    const handleSkinClick = (skin: string) => {
        events.dispatchers.skinChange(skin);
    }

    return (
        <div className="action-panel-content">
            <h2 className="action-panel-heading">Skins</h2>

            {skins.map(skin => {
                return (<AnimationButton key={skin} label={skin} onClick={() => handleSkinClick(skin)} />)
            })}
        </div>
    )
}

export default Skins;