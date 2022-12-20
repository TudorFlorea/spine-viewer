import {
    TextureAtlas,
    AtlasAttachmentLoader,
    SkeletonJson,
    RegionAttachment,
    MeshAttachment,
    ClippingAttachment,
    SkeletonBounds,
    PathAttachment,
    Spine
} from "@pixi-spine/all-3.8";

import {
    Application,
    BaseTexture,
    Sprite,
    Texture,
    Container,
    Graphics,

} from "pixi.js";
import events from "../events";
import { AnimationPlayData, DebugOption, FilesLoadedData, SpineMixin } from "../interfaces";
import { hexStringToNumber } from "../utils/numberUtils";
import { spineDebug } from "../utils/spineDebug";

interface PixiDragEvent {
    data: {
        global: {
            x: number;
            y: number;
        }
    }
}

interface Point {
    x: number;
    y: number;
}

interface HandlerRemover<T> {
    name: T;
    removeHandler: () => void;
}



enum PixiServiceRemoveHandlers {
    ON_START_ANIMATION,
    ON_SKIN_CHANGED,
    ON_SET_MIXIN,
    ON_SET_CANVAS_BACKGROUND,
    ON_TIMELINE_PLAY,
    ON_DEBUG_OPTION_CHANGED,
    ON_SETUP_POSE,
    ON_DESTROY_PIXI_APP,
    ON_FILES_LOADED,
    ON_RESIZE,
    ON_SCROLL,
    ON_DRAG_START,
    ON_DRAG_END,
    ON_DRAG_MOVE
}

class PixiService {
    private spine: Spine | null;
    private app: Application | null;
    private background: Sprite | null;
    private appInitialized: boolean;
    private dragging: boolean;
    private initialPointerPosition: Point | null;
    private initialSpinePosition: Point | null;
    private handlerRemovers: HandlerRemover<PixiServiceRemoveHandlers>[];

    constructor() {
        const spineClassesForDebug = {
            Spine,
            core: {
                RegionAttachment,
                MeshAttachment,
                ClippingAttachment,
                SkeletonBounds,
                PathAttachment
            }
        };
        const pixiClassesForDebug = {
            Container,
            Graphics
        };
        spineDebug(spineClassesForDebug, pixiClassesForDebug);
        this.app = null;
        this.background = null;
        this.spine = null;
        this.appInitialized = false;
        this.dragging = false;
        this.initialPointerPosition = null;
        this.initialSpinePosition = null;
        this.handlerRemovers = [];
    }

    public init(): void {
        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_START_ANIMATION,
            removeHandler: events.handlers.onStartAnimation(this.onStartAnimation.bind(this))
        });
        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_SKIN_CHANGED,
            removeHandler: events.handlers.onSkinChange(this.onSkinChange.bind(this))
        });
        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_SET_MIXIN,
            removeHandler: events.handlers.onSetMixin(this.onSetMixin.bind(this))
        });
        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_SET_CANVAS_BACKGROUND,
            removeHandler: events.handlers.onSetCanvasBackground(this.onSetCanvasBackground.bind(this))
        });
        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_TIMELINE_PLAY,
            removeHandler: events.handlers.onTimelinePlay(this.onTimelinePlay.bind(this))
        });
        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_DEBUG_OPTION_CHANGED,
            removeHandler: events.handlers.onDebugOptionChange(this.onDebugOptionChange.bind(this))
        });
        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_SETUP_POSE,
            removeHandler: events.handlers.onSetupPose(this.onSetupPose.bind(this))
        });
        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_DESTROY_PIXI_APP,
            removeHandler: events.handlers.onDestroyPixiApp(this.onDestroyPixiApp.bind(this))
        });
        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_FILES_LOADED,
            removeHandler: events.handlers.onFilesLoaded(this.onFilesLoaded.bind(this))
        });
    }

    private removeAllEventListeners() {
        this.handlerRemovers.forEach(handlerRemover => {
            handlerRemover.removeHandler();
        });

        this.handlerRemovers = [];
    }

    private onStartAnimation(animationData: AnimationPlayData): void {
        this.spine?.state.clearTrack(0);
        this.spine?.state.clearListeners();
        this.spine?.skeleton.setToSetupPose();
        this.spine?.state.setAnimation(0, animationData.animation, animationData.loop);
        this.spine?.state.addListener({
            event: (_, event) => {
                events.dispatchers.spineEvent(event.data.name);
            }
        })
    }

    private onSkinChange(skin: string): void {
        this.spine?.skeleton.setSkinByName(skin);
    }

    private onSetMixin(mixin: SpineMixin): void {
        this.spine?.stateData.setMix(mixin.fromAnim, mixin.toAnim, mixin.duration);
    }

    private onSetCanvasBackground(background: string): void {
        if (this.background) {
            this.background.tint = hexStringToNumber(background);
        }
    }

    private onTimelinePlay(timeline: string[]): void {
        const animations = [...timeline];
        const firstAnimation = animations.shift();

        if (!firstAnimation) return;

        this.spine?.state.clearTrack(0);
        this.spine?.state.clearListeners();
        this.spine?.skeleton.setToSetupPose();
        this.spine?.state.setAnimation(0, firstAnimation, false);
        this.spine?.state.addListener({
            event: (_, event) => {
                events.dispatchers.spineEvent(event.data.name);
            },
            complete: (entry) => {
                const nextAnimation = animations.shift();

                if (nextAnimation) {
                    this.spine?.state.setAnimation(0, nextAnimation, false);
                }
            }
        })

    }

    private onDebugOptionChange(debugOption: DebugOption): void {
        if (this.spine) {
            // @ts-ignore
            this.spine[debugOption.option] = debugOption.value;
        }
    }

    private onSetupPose(): void {
        this.spine?.state.clearTrack(0);
        this.spine?.skeleton.setToSetupPose();
    }

    private onDestroyPixiApp(): void {
        this.spine = null;
        this.background = null;
        this.app?.destroy(true, {
            children: true,
            texture: true,
            baseTexture: true
        });
        this.app = null;
        const canvasWrapper = document.getElementById("canvas-wrapper");
        if (canvasWrapper) {
            canvasWrapper.style.display = "none";
        }
        this.appInitialized = false;

        this.removeAllEventListeners();
    }

    public dispose() {
        this.spine = null;
        this.background = null;
        this.app?.destroy(true, {
            children: true,
            texture: true,
            baseTexture: true
        });
        this.app = null;
        const canvasWrapper = document.getElementById("canvas-wrapper");
        if (canvasWrapper) {
            canvasWrapper.style.display = "none";
        }
        this.appInitialized = false;
    }

    private onFilesLoaded(filesLoadedData: FilesLoadedData): void {

        if (this.appInitialized) return;

        const files = filesLoadedData.files;
        const rawJson = files.find((file) => file.type === "json")?.data;
        const rawAtlas = files.find((file) => file.type === "atlas")?.data;
        const rawSkeletonData = JSON.parse(rawJson as string);
        const spineAtlas = new TextureAtlas(rawAtlas as string, function (
            line,
            callback
        ) {
            const imageData = filesLoadedData.files.find((file) => file.path === line)?.data;
            //  @ts-ignore
            callback(BaseTexture.from(imageData));
        });

        const spineAtlasLoader = new AtlasAttachmentLoader(
            spineAtlas
        );
        const spineJsonParser = new SkeletonJson(spineAtlasLoader);
        const spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
        this.spine = new Spine(spineData);

        // @ts-ignore
        this.spine["drawDebug"] = true;

        const wrapper = document.getElementById("canvas-wrapper");

        this.app = new Application({
            backgroundColor: hexStringToNumber(filesLoadedData.canvasBackground),
            antialias: true,
            width: window.innerWidth,
            height: window.innerHeight,
        });
        wrapper?.appendChild(this.app.view);

        this.background = new Sprite(Texture.WHITE);

        this.background.width = this.app.screen.width;
        this.background.height = this.app.screen.height;
        this.background.tint = hexStringToNumber(filesLoadedData.canvasBackground);
        this.background.interactive = true;
        this.background
            .on("pointerdown", this.onDragStart.bind(this))
            .on("pointerup", this.onDragEnd.bind(this))
            .on("pointerupoutside", this.onDragEnd.bind(this))
            .on("pointermove", this.onDragMove.bind(this));

        this.app.stage.addChild(this.background);

        this.spine.x = this.app.renderer.width / 2;
        this.spine.y = this.app.renderer.height / 2;
        // @ts-ignore
        this.app.stage.addChild(this.spine);
        this.appInitialized = true;
        this.addGlobalListeners();

        events.dispatchers.spineCreated({
            animations: this.spine.spineData.animations.map(animation => animation.name),
            skins: this.spine.spineData.skins.map(skin => skin.name)
        });
    }

    private onScroll(event: WheelEvent) {
        event.preventDefault();

        if (!this.spine) return;

        const oldScale = this.spine.transform.scale;
        let newScale = this.spine.transform.scale.x;

        if (event.deltaY <= 0) {
            newScale = oldScale.x + 0.2;
        } else if (event.deltaY > 0) {
            newScale = oldScale.x - 0.2;
        }

        if (newScale < 0.02) {
            newScale = 0.02;
        };

        this.spine.transform.scale.x = newScale;
        this.spine.transform.scale.y = newScale;
    }

    private addOnScrollListener() {
        const onScroll = this.onScroll.bind(this);
        this.app?.view.addEventListener('wheel', onScroll);

        const removeOnScrollHandler = () => {
            this.app?.view.removeEventListener('wheel', onScroll);
        };

        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_SCROLL,
            removeHandler: removeOnScrollHandler
        });
    }

    private onResize() {
        if (this.app && this.app.view) {
            this.app.view.style.width = window.innerWidth + "px";
            this.app.view.style.height = window.innerHeight + "px";
        }
    }

    private addOnResizeListener() {
        const onResize = this.onResize.bind(this);
        window.addEventListener('resize', onResize);

        const removeOnResizeHandler = () => {
            window.removeEventListener('resize', onResize);
        };

        this.handlerRemovers.push({
            name: PixiServiceRemoveHandlers.ON_RESIZE,
            removeHandler: removeOnResizeHandler
        });
    }

    private addGlobalListeners(): void {
        this.addOnScrollListener();
        this.addOnResizeListener();
    }

    private onDragStart(event: PixiDragEvent) {
        if (!this.spine) return;
        this.initialPointerPosition = Object.assign({}, event.data.global);
        this.initialSpinePosition = {
            x: this.spine.x,
            y: this.spine.y,
        };
        this.spine.alpha = 0.5;
        this.dragging = true;
    }

    private onDragEnd() {
        if (!this.spine) return;
        this.spine.alpha = 1;
        this.dragging = false;
        this.initialPointerPosition = null;
        this.initialSpinePosition = null;
    }

    private onDragMove(event: PixiDragEvent) {
        if (!this.spine || !this.initialPointerPosition || !this.initialSpinePosition) return;
        if (this.dragging) {
            const newPosition = event.data.global;
            const xDelta = newPosition.x - this.initialPointerPosition.x;
            const yDelta = newPosition.y - this.initialPointerPosition.y;

            this.spine.x = this.initialSpinePosition.x + xDelta;
            this.spine.y = this.initialSpinePosition.y + yDelta;
        }
    }

}

export default PixiService;