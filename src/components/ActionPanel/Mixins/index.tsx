import { useSpineViewerStore } from "../../../store";

const Mixins = () => {

    const {mixins, animations, setMixins} = useSpineViewerStore(store => {
        return {
            animations: store.animations,
            mixins: store.mixins,
            setMixins: store.setMixins
        }
    })

    return (
        <>
            <p>Mixins</p>
            
        </>
    )
}

export default Mixins;