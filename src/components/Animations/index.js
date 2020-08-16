import React, {useState} from 'react';
import Draggable from 'react-draggable';
import CheckBox from '../CheckBox';
import Button from '../Button';

const Animations = props => {

    const {
        animations,
        skins,
        handleSkinClick,
        loopAnimations,
        handleLoopAnimationsChange,
        handleAnimationClick,
        handleSetupPoseClick
    } = props;

    const [showAnimations, setShowAnimations] = useState(true);

    const onShowAnimations = () => {
        setShowAnimations(!showAnimations);
    };

    return (
        <Draggable>
            <div className="animations card">
                <div className="card-content">
                {showAnimations ? (
                    <>
                        <Button 
                            text="Hide animations"
                            onClick={onShowAnimations}
                        />
                        <h4 className="animations--heading">Animations</h4>
                        <CheckBox 
                            checked={loopAnimations}
                            onChange={handleLoopAnimationsChange}
                            label="Loop animations"
                            
                        />
                        {animations.map(anim => {
                            return <Button key={anim} onClick={handleAnimationClick(anim)} text={anim} className="animations--button" />
                        })}

                        <Button onClick={handleSetupPoseClick} text="Setup pose" className="animations--button lime darken-2" />
                        {skins.length ? (
                            <>
                                <h4 className="animations--heading">Skins</h4>
                                {skins.map(skin => {
                                    return <Button key={skin} onClick={handleSkinClick(skin)} text={skin} className="animations--button" />
                                })}
                            </>
                        ) : (null)}
                    </>
                ) : (
                    <Button 
                        text="Show animations"
                        onClick={onShowAnimations}
                    />
                )}
                </div>
            </div>
        </Draggable>

    );
};

export default Animations;