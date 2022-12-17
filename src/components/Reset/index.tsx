import events from "../../events";
import { useSpineViewerStore } from "../../store";
import Button from "../base/Button";
import "./Reset.css";

const Reset = () => {

    const reset = useSpineViewerStore(store => store.reset);

    const handleReset = () => {
        events.dispatchers.destroyPixiApp();
        reset();
    }

    return (
        <Button
            className="reset-button"
            label="Load new spine"
            onClick={handleReset}
        />
    );
};

export default Reset;