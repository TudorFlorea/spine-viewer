
const FILES_LOADED = "FILES_LOADED";
const SPINE_CREATED = "SPINE_CREATED";
const START_ANIMATION = "START_ANIMATION";

export const dispatchFilesLoaded = (files) => {
    const event = new CustomEvent(FILES_LOADED, {
        detail: {
            files: files
        }
    });
    window.dispatchEvent(event);
};

export const onFilesLoaded = (callback) => {
    window.addEventListener(FILES_LOADED, function(e) {
        callback(e.detail.files);
    });
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


export const dispatchStartAnimation = animation => {
    const event = new CustomEvent(START_ANIMATION, {
        detail: {
            animation
        }
    });
    window.dispatchEvent(event);
}

export const onStartAnimation = (callback) => {
    window.addEventListener(START_ANIMATION, function(e) {
        callback(e.detail.animation);
    })
}