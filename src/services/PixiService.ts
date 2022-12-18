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

class PixiService {
    private spine: Spine | null;
    private app: Application | null;
    private background: Sprite | null;
    private appInitialized: boolean;
    private dragging: boolean;
    private initialPointerPosition: Point | null;
    private initialSpinePosition: Point | null;

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
    }

    public init(): void {
        events.handlers.onStartAnimation(this.onStartAnimation.bind(this));
        events.handlers.onSkinChange(this.onSkinChange.bind(this));
        events.handlers.onSetMixin(this.onSetMixin.bind(this));
        events.handlers.onSetCanvasBackground(this.onSetCanvasBackground.bind(this));
        events.handlers.onTimelinePlay(this.onTimelinePlay.bind(this));
        events.handlers.onDebugOptionChange(this.onDebugOptionChange.bind(this));
        events.handlers.onSetupPose(this.onSetupPose.bind(this));
        events.handlers.onDestroyPixiApp(this.onDestroyPixiApp.bind(this));
        events.handlers.onFilesLoaded(this.onFilesLoaded.bind(this));
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
        // this.spine?.stateData.setMixin(mixin.fromAnim, mixin.toAnim, mixin.duration);
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
            // @ts-ignore
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
        //#e4eaf0
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

    private addGlobalListeners(): void {
        const self = this;

        this.app?.view.addEventListener("wheel", function (event) {
            event.preventDefault();

            if (!self.spine) return;

            const oldScale = self.spine.transform.scale;
            let newScale = self.spine.transform.scale.x;

            if (event.deltaY <= 0) {
                newScale = oldScale.x + 0.2;
            } else if (event.deltaY > 0) {
                newScale = oldScale.x - 0.2;
            }

            if (newScale < 0.02) {
                newScale = 0.02;
            };

            self.spine.transform.scale.x = newScale;
            self.spine.transform.scale.y = newScale;
        });

        window.addEventListener("resize", function () {
            const canvas = document.querySelector("#canvas-wrapper canvas") as HTMLCanvasElement;

            if (self.app && canvas) {
                // self.app.screen.width = window.innerWidth;
                // self.app.screen.height = window.innerHeight;
                canvas.style.width = window.innerWidth + "px";
                canvas.style.height = window.innerHeight + "px";
            }

        });
    }

    onDragStart(event: PixiDragEvent) {
        if (!this.spine) return;
        this.initialPointerPosition = Object.assign({}, event.data.global);
        this.initialSpinePosition = {
            x: this.spine.x,
            y: this.spine.y,
        };
        this.spine.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        if (!this.spine) return;
        this.spine.alpha = 1;
        this.dragging = false;
        this.initialPointerPosition = null;
        this.initialSpinePosition = null;
    }

    onDragMove(event: PixiDragEvent) {
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