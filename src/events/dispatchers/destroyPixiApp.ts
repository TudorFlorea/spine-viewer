import { dispatch } from "../dispatch"
import { IDENTIFIERS } from "../identifiers"


export const destroyPixiApp = () => {
	dispatch({
		eventId: IDENTIFIERS.DESTROY_PIXI_APP
	});
};