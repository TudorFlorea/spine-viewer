import { debugOptionChange } from "./dispatchers/debugOptionChange";
import { destroyPixiApp } from "./dispatchers/destroyPixiApp";
import { filesLoaded } from "./dispatchers/filesLoaded";
import { setMixin } from "./dispatchers/setMixin";
import { setCanvasBackground } from "./dispatchers/setCanvasBackground";
import { setupPose } from "./dispatchers/setupPose";
import { skinChange } from "./dispatchers/skinChange";
import { spineCreated } from "./dispatchers/spineCreated";
import { startAnimation } from "./dispatchers/startAnimation";
import { timelinePlay } from "./dispatchers/timelinePlay";
import { onDebugOptionChange } from "./handlers/onDebugOptionsChange";
import { onDestroyPixiApp } from "./handlers/onDestroyPixiApp";
import { onFilesLoaded } from "./handlers/onFilesLoaded";
import { onSetMixin } from "./handlers/onSetMixin";
import { onSetCanvasBackground } from "./handlers/onSetCanvasBackground";
import { onSetupPose } from "./handlers/onSetupPose";
import { onSkinChange } from "./handlers/onSkinChange";
import { onSpineCreated } from "./handlers/onSpineCreated";
import { onStartAnimation } from "./handlers/onStartAnimation";
import { onTimelinePlay } from "./handlers/onTimelinePlay";

const dispatchers = {
    debugOptionChange,
    destroyPixiApp,
    filesLoaded,
    setMixin,
    setCanvasBackground,
    setupPose,
    skinChange,
    spineCreated,
    startAnimation,
    timelinePlay
};

const handlers = {
    onDebugOptionChange,
    onDestroyPixiApp,
    onFilesLoaded,
    onSetMixin,
    onSetCanvasBackground,
    onSetupPose,
    onSkinChange,
    onSpineCreated,
    onStartAnimation,
    onTimelinePlay
}

export default {
    dispatchers,
    handlers
};














