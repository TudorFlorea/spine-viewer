import Stats from "stats.js";

class StatsService {
    public static FPS = 0;
    public static MS = 1;
    public static MB = 2;
    private static rafRequestId = 0;
    private static stats?: Stats;

    public static show(value = 0) {
        if(!this.stats) {
            this.stats = new Stats();
        }

        this.stats.showPanel(value);
        document.body.appendChild( this.stats.dom );
        this.rafRequestId = requestAnimationFrame(this.animate.bind(this));
    }

    private static animate() {
        this.stats?.update();
	    this.rafRequestId = requestAnimationFrame(this.animate.bind(this));
    }

    public static hide() {
        if(this.rafRequestId !== 0) {
            cancelAnimationFrame(this.rafRequestId);
            this.rafRequestId = 0;
        }

        if(this.stats) {
            document.body.removeChild(this.stats.dom);
            this.stats = undefined;
        }
    }

}

export default StatsService;