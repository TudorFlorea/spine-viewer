import { useState } from "react";
import events from "../../../events";
import { useSpineViewerStore } from "../../../store";
import ActionPanelContent from "../common/ActionPanelContent";
import AnimationButton from "../common/AnimationButton";


const Skins = () => {

    const skins = useSpineViewerStore(store => store.skins);

    const handleSkinClick = (skin: string) => {
        events.dispatchers.skinChange(skin);
    }

    return (
        <ActionPanelContent title="Skins">
            {skins.map(skin => {
                return (<AnimationButton key={skin} label={skin} onClick={() => handleSkinClick(skin)} />)
            })}
        </ActionPanelContent>
    )
}

export default Skins;