import React from 'react';
import '../App.css';

/**
 * AnimatedBullets component displays a list of trading strategy rules.
 * Each rule is represented by a bullet point with an icon and colored text.
 *
 * @returns {JSX.Element} A div containing three bullet points explaining trading signals.
 */
const AnimatedBullets = () => {
    const bulletPoints = [
        {
            text: "If the spread value exceeds two historical deviations, generate a ",
            highlight: { text: "sell", color: 'blue' }
        },
        {
            text: "",
            highlight: { text: "Close", color: 'rgb(0, 230, 0, 0.99)' },
            postHighlight: " open position when spread crosses the zero mark"
        },
        {
            text: "If the spread value is below minus two historical deviations, generate a ",
            highlight: { text: "buy", color: 'red' }
        }
    ];

    return (
        <div className="bullet-container">
            {bulletPoints.map((point, index) => (
                <BulletPoint key={index} {...point} />
            ))}
        </div>
    );
};

/**
 * BulletPoint component represents a single bullet point in the list.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.text - The main text of the bullet point.
 * @param {Object} props.highlight - An object containing the highlighted text and its color.
 * @param {string} props.postHighlight - Any text to be displayed after the highlighted portion.
 * @returns {JSX.Element} A div containing the bullet point icon and text.
 */
const BulletPoint = ({ text, highlight, postHighlight }) => (
    <div className="bullet-point">
        <div className="bullet-icon">&#8677;</div>
        <p>
            {text}
            {highlight && <span style={{ color: highlight.color }}>{highlight.text} signal</span>}
            {postHighlight}
        </p>
    </div>
);

export default AnimatedBullets;