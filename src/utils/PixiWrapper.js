import {onFilesLoaded, onStartAnimation, dispatchSpineCreated} from "../services/events";

class PixiWrapper {

    constructor() {

    }

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

        onStartAnimation(function(animation) {
            self.spine.state.setAnimation(0, animation, true);
        });

        onFilesLoaded(function(files) {

            const PIXI = window.PIXI;

            const wrapper = document.getElementById("canvas-wrapper");
            const app = new PIXI.Application({
                backgroundColor:0x777777,
                antialias:true,
                width:800,
                height:600
            });
            wrapper.appendChild(app.view);

            console.log("from pixi", files);

            var rawSkeletonData = JSON.parse(files.json); //your skeleton.json file here

            var spineAtlas = new PIXI.spine.core.TextureAtlas(files.atlas, function(line, callback) {
                // pass the image here.
                callback(PIXI.BaseTexture.from(files.png));
            }); // specify path, image.png will be added automatically

            var spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas)
            var spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);

            // in case if you want everything scaled up two times
           // spineJsonParser.scale = 2.0; 

            var spineData = spineJsonParser.readSkeletonData(rawSkeletonData);

            // now we can create spine instance
            var spine = new PIXI.spine.Spine(spineData);
            spine.transform.pivot.x = 0.5;
            spine.transform.pivot.y = 0.5;
            console.log(spine);
            console.log(app);
            console.log(app.stage);
            spine.interactive = true;

            // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
            spine.buttonMode = true;
            spine
                .on('pointerdown', self.onDragStart)
                .on('pointerup', self.onDragEnd)
                .on('pointerupoutside', self.onDragEnd)
                .on('pointermove', self.onDragMove);
            spine.x = app.renderer.width / 2;
            spine.y = app.renderer.height / 2;
            app.stage.addChild(spine);
            self.spine = spine;
            dispatchSpineCreated(spine.spineData);
        });

        // app.start();
        
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
        }
    }

}

export default PixiWrapper;