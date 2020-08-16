import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import {v4 as uuid} from 'uuid';
import M from 'materialize-css';

import Button from '../Button';
import TextInput from '../TextInput';

const Mixins = props => {
    const {
        animations,
        onAddMixin = () => {}
    } = props;

    const [fromAnim, setFromAnim] = useState("");
    const [toAnim, setToAnim] = useState("");
    const [duration, setDuration] = useState(0);
    const [mixins, setMixins] = useState([]);
    const [showMixins, setShowMixins] = useState(false);

    const onShowMixinsToggle = () => {
        setShowMixins(!showMixins);
    };

    const handleAddMixin = () => {
        const currentMixin = {
            fromAnim: fromAnim,
            toAnim: toAnim,
            duration: parseFloat(duration),
            id: uuid()
        };

        const hasMixin = mixins.findIndex(mixin => mixin.fromAnim === currentMixin.fromAnim && mixin.toAnim === currentMixin.toAnim ) !== -1;

        if(hasMixin) {

            let newMixins = mixins.map(mixin => {
                if(mixin.fromAnim === currentMixin.fromAnim && mixin.toAnim === currentMixin.toAnim) {
                    return currentMixin;
                } else {
                    return mixin;
                }
            });

            setMixins(newMixins);

        } else {
            setMixins([
                ...mixins,
                currentMixin
            ]);
        }
        onAddMixin(currentMixin);
    };

    const handleFromAnimationChange = e => {
        setFromAnim(e.target.value);
    };

    const handleToAnimationChange = e => {
        setToAnim(e.target.value);
    };

    const haldleDurationChange = e => {
        setDuration(e.target.value);
    };

    const handleMixinDelete = mixinToDelete => {
        console.log(mixinToDelete);
        return () => {
            console.log(mixinToDelete);
            setMixins(
                mixins.filter(mixin =>!(mixin.fromAnim === mixinToDelete.fromAnim && mixin.toAnim === mixinToDelete.toAnim))
            );
            onAddMixin({
                ...mixinToDelete,
                duration: 0
            });
        };
    };

    useEffect(() => {
        showMixins && M.FormSelect.init(document.querySelectorAll('select'));
    }, [showMixins]);

    return (
        <Draggable cancel="mixin--duration">
            <div className="card mixins">
                {showMixins ? (
                    <>
                        <Button 
                            text="Hide mixins"
                            onClick={onShowMixinsToggle}
                        />
                        <div className="row">
                            <div className="input-field col s3">
                                <select value={fromAnim} onChange={handleFromAnimationChange}>
                                    <option value="" disabled>From anim</option>
                                    {animations && animations.map(anim => {
                                        return <option key={anim} value={anim}>{anim}</option>
                                    })}
                                </select>
                            </div>
                            <div className="input-field col s3">
                                <select value={toAnim} onChange={handleToAnimationChange}>
                                    <option value="" disabled>To anim</option>
                                    {animations && animations.map(anim => {
                                        return <option key={anim} value={anim}>{anim}</option>
                                    })}
                                </select>
                            </div>
                            <TextInput 
                                wrapperClassName="col s3 mixin--duration"
                                value={duration}
                                onChange={haldleDurationChange}
                            />
                            <Button 
                                text="Add"
                                onClick={handleAddMixin}
                                className="col s3 timeline--add-btn"
                            />
                        </div>
                        {mixins.length > 0 && 
                            <>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>From animation</th>
                                        <th>To animation</th>
                                        <th>Duration</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {mixins.map(mixin => {
                                            return (
                                                <tr key={mixin.id}>
                                                    <td>{mixin.fromAnim}</td>
                                                    <td>{mixin.toAnim}</td>
                                                    <td>{mixin.duration}</td>
                                                    <td>
                                                        <a href="#!" className="secondary-content">
                                                            <i onClick={handleMixinDelete(mixin)} className="material-icons red-text text-darken-1">delete</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>
                        }
                    </>
                ) : (
                    <Button 
                        text="Show mixins"
                        onClick={onShowMixinsToggle}
                    />
                )}

            </div>
        </Draggable>
    )
    
};

export default Mixins;