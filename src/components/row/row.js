import React from 'react';
import PropTypes from 'prop-types';

import './row.css';

const Row = ({ left, right }) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    );
};

Row.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node
}

// example

//    MyComp.propTypes = {
//        user: PropTypes.shape({
//            name: PropTypes.string,
//            role: PropTypes.oneOf(['user','admin'])
//        })
//    }


export default Row;

