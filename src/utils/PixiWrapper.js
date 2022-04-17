import {
    onFilesLoaded,
    onStartAnimation,
    onSpineScaleChange,
    onCoordsChange,
    onSetupPose,
    onTimelinePlay,
    onSkinChange,
    dispatchSpineCreated,
    onDebugOptionChange,
    dispatchCoordsChange,
    onDestroyPixiApp,
    onSetMixin,
    onScaleRangeChange,
    dispatchSpineScaleChange
} from "../services/events";

import {hexStringToNumber} from '../utils/numberUtils';

class PixiWrapper {

    init() {

        // this.addGlobalListeners();

        const self = this;

        onScaleRangeChange(scaleRange => {
            self.scaleRange = scaleRange;
        });

        onStartAnimation(function(animation, loop) {
            self.spine.state.clearTrack(0);
            self.spine.state.clearListeners();
            self.spine.skeleton.setToSetupPose();
            self.spine.state.setAnimation(0, animation, loop);
        });

        onSkinChange(skin => {
            self.spine.skeleton.setSkinByName(skin);
        });

        onSetMixin(mixin => {
            self.spine.stateData.setMix(mixin.fromAnim, mixin.toAnim, mixin.duration);
        });

        onTimelinePlay((timeline) => {
            console.log("TIMELINE", timeline);
            let animations = [...timeline];
            let fistAnimation = animations.shift();
            self.spine.state.clearTrack(0);
            self.spine.state.clearListeners();
            self.spine.skeleton.setToSetupPose();
            self.spine.state.setAnimation(0, fistAnimation, false);
            self.spine.state.addListener({
                complete: function(entry) { 
                    console.log('animation was ended at '+entry.trackIndex) 
                    const nextAnimation = animations.shift();

                    if(nextAnimation) {
                        self.spine.state.setAnimation(0, nextAnimation, false);
                    }
                }
            });
        });

        onSpineScaleChange(function(value) {
            // self.spine[prop] = value;
            self.spine.transform.scale.x = value;
            self.spine.transform.scale.y = value;
        });

        onDebugOptionChange((option, value) => {
            self.spine[option] = value;
        });

        onCoordsChange((coords) => {

            if (!self.spine) return;

            self.spine.x = parseFloat(coords.x);
            self.spine.y = parseFloat(coords.y);
        });

        onSetupPose(() => {
            self.spine.state.clearTrack(0);
            self.spine.skeleton.setToSetupPose();
        });

        onDestroyPixiApp(() => {
            self.spine = null;
            self.app.destroy(true, true);
        });

        onFilesLoaded(function(data) {

            const PIXI = window.PIXI;
            const files = data.files;
            const rawJson = files.find(file => file.type === "json").data;
            const rawAtlas = files.find(file => file.type === "atlas").data;

            const wrapper = document.getElementById("canvas-wrapper");
            self.app = new PIXI.Application({
                backgroundColor: hexStringToNumber(data.background),
                antialias: true,
                width: data.width,
                height: data.height
            });
            wrapper.appendChild(self.app.view);

            self.addGlobalListeners();

            // Create the background sprite with a basic white texture
            let background = new PIXI.Sprite(PIXI.Texture.WHITE);
            // Set it to fill the screen
            background.width = self.app.screen.width;
            background.height = self.app.screen.height;
            // Tint it to whatever color you want, here red
            background.tint = hexStringToNumber(data.background);
            // Add a click handler
            background.interactive = true;
            background
                .on('pointerdown', self.onDragStart.bind(self))
                .on('pointerup', self.onDragEnd.bind(self))
                .on('pointerupoutside', self.onDragEnd.bind(self))
                .on('pointermove', self.onDragMove.bind(self));
            // Add it to the stage as the first object
            self.app.stage.addChild(background);

            let rawSkeletonData = JSON.parse(rawJson); //your skeleton.json file here

            let spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlas, function(line, callback) {
                const imageData = files.find(file => file.path === line).data;
                callback(PIXI.BaseTexture.from(imageData));
            }); // specify path, image.png will be added automatically

            let spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas)
            let spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);

            let spineData = spineJsonParser.readSkeletonData(rawSkeletonData);

            // now we can create spine instance
            let spine = new PIXI.spine.Spine(spineData);
            console.log(spine);
            console.log(self.app);
            console.log(self.app.stage);
            // spine.interactive = true;

            spine['drawDebug'] = true;

            spine.x = self.app.renderer.width / 2;
            spine.y = self.app.renderer.height / 2;
            self.app.stage.addChild(spine);
            self.spine = spine;
            window.spine = spine;
            window.app = self.app;
            dispatchSpineCreated(spine.spineData);
            dispatchCoordsChange({
                x: self.spine.x,
                y: self.spine.y
            })
        });
        
    }

    onDragStart(event) {
        this.initalPointerPosition = Object.assign({}, event.data.global);
        this.initalSpinePosition = {
            x: this.spine.x,
            y: this.spine.y
        };
        this.spine.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        this.spine.alpha = 1;
        this.dragging = false;
        this.initalPointerPosition = null;
        this.initalSpinePosition = null;
    }

    onDragMove(event) {
        if (this.dragging) {
            const newPosition = event.data.global;
            const xDelta = newPosition.x - this.initalPointerPosition.x;
            const yDelta = newPosition.y - this.initalPointerPosition.y;

            this.spine.x = this.initalSpinePosition.x + xDelta;
            this.spine.y = this.initalSpinePosition.y + yDelta;

            dispatchCoordsChange({
                x: this.spine.x,
                y: this.spine.y
            })
        }
    }


    addGlobalListeners() {

        const self = this;

        this.app.view.addEventListener('wheel', function(event)  {
            event.preventDefault();

            if (!self.spine || !self.scaleRange) return;

            const oldScale = self.spine.transform.scale;
            let newScale;

            if (event.deltaY < 0)
            {
                console.log('scrolling up');
                newScale = parseFloat(oldScale.x) + 0.2;
            }
            else if (event.deltaY > 0)
            {
                console.log('scrolling down');
                newScale = parseFloat(oldScale.x) - 0.2
            }

            newScale = newScale.toFixed(1);

            if(newScale < self.scaleRange.min) {
                newScale = self.scaleRange.min;
            }

            if(newScale > self.scaleRange.max) {
                newScale = self.scaleRange.max;
            }

            dispatchSpineScaleChange(newScale);

        });

        // window.addEventListener('wheel', function(event)  {
        //     event.preventDefault();

        //     if (!self.spine || !self.scaleRange) return;

        //     const oldScale = self.spine.transform.scale;
        //     let newScale;

        //     if (event.deltaY < 0)
        //     {
        //         console.log('scrolling up');
        //         newScale = parseFloat(oldScale.x) + 0.2;
        //     }
        //     else if (event.deltaY > 0)
        //     {
        //         console.log('scrolling down');
        //         newScale = parseFloat(oldScale.x) - 0.2
        //     }

        //     newScale = newScale.toFixed(1);

        //     if(newScale < self.scaleRange.min) {
        //         newScale = self.scaleRange.min;
        //     }

        //     if(newScale > self.scaleRange.max) {
        //         newScale = self.scaleRange.max;
        //     }

        //     dispatchSpineScaleChange(newScale);

        // });
    }

}

export default PixiWrapper;