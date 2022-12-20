import { DebugConfigOption } from "../interfaces";


const debugOptions: DebugConfigOption[] = [
	{
		prop: "drawBones",
		label: "Draw bones",
		value: false,
	},
	{
		prop: "drawRegionAttachments",
		label: "Draw region attachments",
		value: false,
	},
	{
		prop: "drawClipping",
		label: "Draw clipping",
		value: false,
	},
	{
		prop: "drawMeshHull",
		label: "Draw mesh hull",
		value: false,
	},
	{
		prop: "drawMeshTriangles",
		label: "Draw mesh triangles",
		value: false,
	},
	{
		prop: "drawPaths",
		label: "Draw paths",
		value: false,
	},
	{
		prop: "drawBoundingBoxes",
		label: "Draw bounding boxes",
		value: false,
	},
];

export default {
    debugOptions
};
