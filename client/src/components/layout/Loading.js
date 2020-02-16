import React, {Fragment} from 'react';
import loading  from "./loading.gif";

const Loading = () => {
    return (
        <Fragment>
            <img src={loading} alt="Loading gif" style={{width: "50px", margin: "auto", display:"block"}}/>
        </Fragment>
    )
}

export default Loading;
