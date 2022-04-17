
const FILES_LOADED = "FILES_LOADED";
const SPINE_CREATED = "SPINE_CREATED";
const START_ANIMATION = "START_ANIMATION";
const SPINE_SCALE_CHANGE = "SPINE_SCALE_CHANGE";
const DEBUG_OPTION_CHANGE = "DEBUG_OPTION_CHANGE";
const COORDS_CHANGE = "COORDS_CHANGE";
const SCALE_RANGE_CHANGE = "SCALE_RANGE_CHANGE";
const SETUP_POSE = "SETUP_POSE";
const DESTROY_PIXI_APP = "DESTROY_PIXI_APP";
const TIMELINE_PLAY = "TIMELINE_PLAY";
const SKIN_CHANGE = "SKIN_CHANGE";
const SET_MIXIN = "SET_MIXIN";

export const dispatch = (options) => {
    const {eventId, target = window, detail = {}} = options;
    if (!eventId) throw new Error("You are trying to dispach an event withou an event id");
    const event = new CustomEvent(eventId, {
        detail
    });
    target.dispatchEvent(event);
};

export const register = (options) => {
    const {eventId, target = window, callback = () => {}} = options;
    if (!eventId) throw new Error("You are trying to dispach an event withou an event id");

    target.addEventListener(eventId, callback);
};

export const dispatchFilesLoaded = (data) => {
    dispatch({
        eventId: FILES_LOADED,
        detail: {
            data
        }
    })
};

export const onFilesLoaded = (cb) => {
    register({
        eventId: FILES_LOADED,
        callback: e => {
            cb(e.detail.data)
        }
    })
};

export const dispatchDestroyPixiApp = () => {
    dispatch({
        eventId: DESTROY_PIXI_APP
    })
};

export const onDestroyPixiApp = (cb) => {
    register({
        eventId: DESTROY_PIXI_APP,
        callback: () => {
            cb()
        }
    })
};

export const dispatchTimelinePlay = (timeline) => {
    dispatch({
        eventId: TIMELINE_PLAY,
        detail: {
            timeline
        }
    })
};

export const onTimelinePlay = (cb) => {
    register({
        eventId: TIMELINE_PLAY,
        callback: e => {
            cb(e.detail.timeline)
        }
    })
};

export const dispatchSkinChange = (skin) => {
    dispatch({
        eventId: SKIN_CHANGE,
        detail: {
            skin
        }
    })
};

export const onSkinChange = (cb) => {
    register({
        eventId: SKIN_CHANGE,
        callback: e => {
            cb(e.detail.skin)
        }
    })
};

export const dispatchSetMixin = (mixin) => {
    dispatch({
        eventId: SET_MIXIN,
        detail: {
            mixin
        }
    })
};

export const onSetMixin = (cb) => {
    register({
        eventId: SET_MIXIN,
        callback: e => {
            cb(e.detail.mixin)
        }
    })
};

export const dispatchDebugOptionChange = (option, value) => {
    dispatch({
        eventId: DEBUG_OPTION_CHANGE,
        detail: {
            option,
            value
        }
    });
};

export const onDebugOptionChange = (cb) => {
    register({
        eventId: DEBUG_OPTION_CHANGE,
        callback: e => {
            cb(e.detail.option, e.detail.value)
        }
    })
};

export const dispatchCoordsChange = (coords) => {
    dispatch({
        eventId: COORDS_CHANGE,
        detail: {
            coords
        }
    });
};

export const onCoordsChange = (cb) => {
    register({
        eventId: COORDS_CHANGE,
        callback: e => {
            cb(e.detail.coords)
        }
    })
};

export const dispatchSetupPose = () => {
    dispatch({
        eventId: SETUP_POSE
    });
};

export const onSetupPose = (cb) => {
    register({
        eventId: SETUP_POSE,
        callback: () => {
            cb()
        }
    })
};

export const dispatchScaleRangeChange = (scaleRange) => {
    dispatch({
        eventId: SCALE_RANGE_CHANGE,
        detail: {
            scaleRange
        }
    });
};

export const onScaleRangeChange = (cb) => {
    register({
        eventId: SCALE_RANGE_CHANGE,
        callback: e => {
            cb(e.detail.scaleRange)
        }
    })
};

export const dispatchSpineCreated = data => {
    const event = new CustomEvent(SPINE_CREATED, {
        detail: {
            data
        }
    });
    window.dispatchEvent(event);
};

export const onSpineCreated = (callback) => {
    window.addEventListener(SPINE_CREATED, function(e) {
        callback(e.detail.data);
    })
};


export const dispatchStartAnimation = (animation, loop) => {
    const event = new CustomEvent(START_ANIMATION, {
        detail: {
            animation,
            loop
        }
    });
    window.dispatchEvent(event);
}

export const onStartAnimation = (callback) => {
    window.addEventListener(START_ANIMATION, function(e) {
        callback(e.detail.animation, e.detail.loop);
    })
}

export const dispatchSpineScaleChange = (scale) => {
    const event = new CustomEvent(SPINE_SCALE_CHANGE, {
        detail: {
            scale
        }
    });
    window.dispatchEvent(event);
}

export const onSpineScaleChange = (callback) => {
    window.addEventListener(SPINE_SCALE_CHANGE, function(e) {
        callback(e.detail.scale);
    })
}
