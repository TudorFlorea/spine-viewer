import events from "../../../events";
import { useSpineViewerStore } from "../../../store";
import PanelCheckbox from "../common/PanelCheckbox";
import AnimationButton from "../common/AnimationButton";
import ActionPanelContent from "../common/ActionPanelContent";


const Animations = () => {

    const { animations, loopAnimations, setLoopAnimations } = useSpineViewerStore(store => {
        return {
            animations: store.animations,
            loopAnimations: store.loopAnimations,
            setLoopAnimations: store.setLoopAnimations
        }
    });

    const handleAnimationClick = (animation: string) => {
        events.dispatchers.startAnimation({
            animation: animation,
            loop: loopAnimations
        });
    }

    return (
        <ActionPanelContent
            title="Animations"
        >
            <>
                <PanelCheckbox
                    onChange={e => setLoopAnimations(e.target.checked)}
                    checked={loopAnimations}
                    label="Play looped animations"
                />

                {animations.map(animation => {
                    return (<AnimationButton key={animation} label={animation} onClick={() => handleAnimationClick(animation)} />)
                })}
            </>
        </ActionPanelContent>
    )
}

export default Animations;