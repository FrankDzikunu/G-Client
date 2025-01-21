// src/components/NextStep.js
import React from 'react';
import './NextStep.css';

function NextStep() {
  const technologies = [
    'ReactJS', 'Redux', 'NodeJS', 'MongoDB', 
    'AWS', 'Tableau', 'Python', 'SQL', 
    'Java', 'Azure', 'Docker', 'ExpressJS'
  ];

  return (
    <section className="next-step">
      <h2>What will be next step</h2>
      <p>
      Discover our diverse stack of solutions, including software development, data science, 
      and cloud tools. Sign up today and kickstart your journey!
      </p>
      <div className="tech-grid">
        {technologies.map((tech, index) => (
          <button key={index} className="tech-button">
            {tech}
          </button>
        ))}
      </div>
    </section>
  );
}

export default NextStep;
