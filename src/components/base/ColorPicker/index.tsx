

import { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import "./ColorPicker.css";

interface ColorPickerProps {
    color: string;
    handleColorChange: (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, handleColorChange, label }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

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
                <span className="color-picker__text">{label}</span>
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
