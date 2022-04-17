import React, {useCallback} from 'react';
import copy from 'copy-to-clipboard';
import M from 'materialize-css';

const SpineDataEntry = ({name, onNameClick = () => {}, disabled = false}) => {

    const onCopyClick = useCallback(() => {
        copy(name);
        M.toast({html: 'Copied to clipboard!'})
        console.log("copy...");
    }, [name]);

    return (
        <div className="spine-data">
            <div onClick={onNameClick} className={`spine-data__name ${disabled ? 'spine-data__name--disabled' : ''}`}>{name}</div>
            <div onClick={onCopyClick} className="spine-data__copy"><i className="tiny material-icons">content_copy</i></div>
        </div>
    );

};

export default SpineDataEntry;