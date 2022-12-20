import { useSpineViewerStore } from "../../../store";
import ActionPanelContent from "../common/ActionPanelContent";

const Mixins = () => {

    const { mixins, animations, setMixins } = useSpineViewerStore(store => {
        return {
            animations: store.animations,
            mixins: store.mixins,
            setMixins: store.setMixins
        }
    })

    return (
        <ActionPanelContent title="Mixins"></ActionPanelContent>
    )
}

export default Mixins;