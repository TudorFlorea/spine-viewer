import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import CheckBox from '../CheckBox';
import Button from '../Button';
import M from "materialize-css";
import SpineDataEntry from './SpineDataEntry';

const SpineData = props => {

    const {
        spineData,
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

    useEffect(() => {
        M.Collapsible.init(document.querySelectorAll('.spine-elements'));
    }, [showAnimations]);


    if (!spineData) return null;

    const {
        animations,
        skins,
        slots,
        bones
    } = spineData;

    return (
        <Draggable cancel='.spine-elements'>
            <div className="animations card">
                <div className="card-content">
                {showAnimations ? (
                    <>
                        <Button 
                            text="Hide spine data"
                            onClick={onShowAnimations}
                        />
                        <ul className="collapsible spine-elements">
                            <li className='active'>
                                <div className="collapsible-header">Animations</div>
                                <div className="collapsible-body">
                                    <CheckBox 
                                        checked={loopAnimations}
                                        onChange={handleLoopAnimationsChange}
                                        label="Loop animations"
                                        
                                    />
                                    {animations.map(anim => {
                                        return <SpineDataEntry key={anim} name={anim} onNameClick={handleAnimationClick(anim)} />
                                        // return <Button key={anim} onClick={handleAnimationClick(anim)} text={anim} className="animations--button" />
                                    })}
                                    <Button onClick={handleSetupPoseClick} text="Setup pose" className="animations--button lime darken-2" />
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">Skins</div>
                                <div className="collapsible-body">
                                    {skins.length ? (
                                        <>
                                            {skins.map(skin => {
                                                return <SpineDataEntry key={skin} onNameClick={handleSkinClick(skin)} name={skin} />
                                            })}
                                        </>
                                    ) : (<p>No skins</p>)}
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">Slots</div>
                                <div className="collapsible-body">
                                    {slots.length ? (
                                        <>
                                            {slots.map(slot => {
                                                return <SpineDataEntry key={slot} name={slot} disabled />;
                                            })}
                                        </>
                                    ) : (<p>No slots</p>)}
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">Bones</div>
                                <div className="collapsible-body">
                                    {bones.length ? (
                                        <>
                                            {bones.map(bone => {
                                                return <SpineDataEntry key={bone} name={bone} disabled />;
                                            })}
                                        </>
                                    ) : (<p>No bones</p>)}
                                </div>
                            </li>
                        </ul>


                        

                    </>
                ) : (
                    <Button 
                        text="Show spine data"
                        onClick={onShowAnimations}
                    />
                )}
                </div>
            </div>
        </Draggable>

    );
};

export default SpineData;