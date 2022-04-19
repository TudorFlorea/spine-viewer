import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = (props) => {
	const [displayColorPicker, setDisplayColorPicker] = useState(false);
	const { color, handleColorChange } = props;

	const handleSwatchClick = () => {
		setDisplayColorPicker(!displayColorPicker);
	};

	const handleClose = () => {
		setDisplayColorPicker(false);
	};

	return (
		<div className="color-picker">
			<div className="color-picker__swatch" onClick={handleSwatchClick}>
				<div
					style={{ backgroundColor: color }}
					className="color-picker__color"
				/>
				<span className="color-picker__text">Press to pick a color</span>
			</div>
			{displayColorPicker ? (
				<div className="color-picker__popover">
					<div className="color-picker__cover" onClick={handleClose} />
					<SketchPicker color={color} onChange={handleColorChange} />
				</div>
			) : null}
		</div>
	);
};

export default ColorPicker;
