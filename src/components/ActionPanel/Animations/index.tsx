import events from "../../../events";
import { useSpineViewerStore } from "../../../store";
import PanelCheckbox from "../PanelCheckbox";
import AnimationButton from "../common/AnimationButton";


const Animations = () => {

    const { animations, loopAnimations, setLoopAnimations } = useSpineViewerStore(store => {
        return {
            animations: store.animations,
            loopAnimations: store.loopAnimations,
            setLoopAnimations: store.setLoopAnimations
        }
    });

    const handleAnimationClick = (animation: string) => {
        console.log(animation);
        events.dispatchers.startAnimation({
            animation: animation,
            loop: loopAnimations
        });
    }

    return (
        <div className="action-panel-content">
            <h2 className="action-panel-heading">Animations</h2>

            <PanelCheckbox
                onChange={e => setLoopAnimations(e.target.checked)}
                checked={loopAnimations}
                label="Play looped animations"
            />

            {animations.map(animation => {
                return (<AnimationButton key={animation} label={animation} onClick={() => handleAnimationClick(animation)} />)
            })}

        </div>
    )
}

export default Animations;