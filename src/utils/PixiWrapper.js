import {
    onFilesLoaded,
    onStartAnimation,
    onSpineScaleChange,
    onCoordsChange,
    onSetupPose,
    onTimelinePlay,
    dispatchSpineCreated,
    onDebugOptionChange,
    dispatchCoordsChange,
    onDestroyPixiApp
} from "../services/events";

import {hexStringToNumber} from '../utils/numberUtils';

class PixiWrapper {

    init() {


        // let loader = PIXI.loader.add('spineboy','./assets/spineboy-pro.json');

        // loader.add('vine','./assets/spine/vine-pro.json')

        //loader.load((loader,res)=>{
            // console.log(res);
            // let vine = new PIXI.spine.Spine(res.spineboy.spineData),
            //     options = [''];
            // console.log(vine)
            // // vine
            // vine.scale.set(0.4);
            // vine.state.setAnimation(0,'portal',true);
            // vine.x = 200;
            // vine.y = 280;
            // vine.drawDebug = true;

            //app.stage.addChild(vine);

            
        //});

        let self = this;

        onStartAnimation(function(animation, loop) {
            self.spine.state.clearTrack(0);
            self.spine.state.clearListeners();
            self.spine.skeleton.setToSetupPose();
            self.spine.state.setAnimation(0, animation, loop);
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
            self.spine.x = coords.x;
            self.spine.y = coords.y;
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

            const wrapper = document.getElementById("canvas-wrapper");
            self.app = new PIXI.Application({
                backgroundColor: hexStringToNumber(data.background),
                antialias: true,
                width: data.width,
                height: data.height
            });
            wrapper.appendChild(self.app.view);

            console.log("from pixi", files);

            let rawSkeletonData = JSON.parse(files.json); //your skeleton.json file here

            let spineAtlas = new PIXI.spine.core.TextureAtlas(files.atlas, function(line, callback) {
                // pass the image here.
                callback(PIXI.BaseTexture.from(files.png));
            }); // specify path, image.png will be added automatically

            let spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas)
            let spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);

            let spineData = spineJsonParser.readSkeletonData(rawSkeletonData);

            // now we can create spine instance
            let spine = new PIXI.spine.Spine(spineData);
            console.log(spine);
            console.log(self.app);
            console.log(self.app.stage);
            spine.interactive = true;

            // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
            spine.buttonMode = true;

            spine['drawDebug'] = true;
            spine
                .on('pointerdown', self.onDragStart)
                .on('pointerup', self.onDragEnd)
                .on('pointerupoutside', self.onDragEnd)
                .on('pointermove', self.onDragMove);
            spine.x = self.app.renderer.width / 2;
            spine.y = self.app.renderer.height / 2;
            self.app.stage.addChild(spine);
            self.spine = spine;
            dispatchSpineCreated(spine.spineData);
        });
        
    }

    onDragStart(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
            dispatchCoordsChange({
                x: newPosition.x,
                y: newPosition.y
            })
        }
    }

}

export default PixiWrapper;