import React, {useState} from 'react';
import {SketchPicker} from 'react-color';

const styles={
    display: "inline-block",
    paddingTop: 5,
    marginRight: 10
}

const ColorPicker = props => {

    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const {color, handleColorChange} = props;

    const handleSwatchClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    }

    return (
        <div className="color-picker">
        <div className="color-picker__swatch" style={styles.swatch} onClick={handleSwatchClick}>
            <div className="color-picker__color"  style={styles.color} />
            <span style={styles.infoText}>Color</span>
        </div>
        {displayColorPicker ? (
          <div className="color-picker__popover" style={styles.popover}>
            <div className="color-picker__cover" style={styles.cover} onClick={handleClose} />
            <SketchPicker
              color={color}
              onChange={handleColorChange}
            />
          </div>
        ) : null}
      </div>
    );
};

export default ColorPicker;