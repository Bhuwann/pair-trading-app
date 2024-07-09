import React from 'react';
import '../App.css';

const AnimatedBullets = () => {
    return (
        <div className="bullet-container">
            <div className="bullet-point">
                <div className="bullet-icon">&#8677;</div>
                <p>If the spread value exceeds two historical deviations, generate a <span style={{color: 'blue'}}>sell</span> signal</p>
            </div>
            <div className="bullet-point">
                <div className="bullet-icon">&#8677;</div>
                <p><span style={{color: 'rgb(0,230,0, 0.99)'}}>Close</span> open position when spread crosses the zero mark</p>
            </div>
            <div className="bullet-point">
                <div className="bullet-icon">&#8677;</div>
                <p>If the spread value is below minus two historical deviations, generate a <span style={{color: 'red'}}>buy</span> signal</p>
            </div>
        </div>
    );
};

export default AnimatedBullets;
