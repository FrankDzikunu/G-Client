// src/components/Solutions.js
import React from 'react';
import './css/Cards.css';

function Solutions() {
  const courses = [
    {
      title: 'Software Development',
      description:
        'Unlock your potential with comprehensive training in modern software development, from coding fundamentals to building complex applications.',
      price: '$300',
      icon: "/images/mane.png", // You can replace this with an image if desired
    },
    {
      title: 'Data Science Mastery',
      description:
        'Equip yourself with the skills to analyze, interpret, and leverage data, becoming an expert in machine learning, AI, and data-driven decision-making.',
      price: '$350',
      icon: "/images/data.png",
    },
    {
      title: 'Cloud Computing Expertise',
      description:
        'Gain hands-on experience in cloud architecture and deployment, preparing you to design, implement, and manage scalable cloud solutions in the real world.',
      price: '$400',
      icon: "/images/cloud.png",
    },
  ];

  return (
    <section className="solutions">
      <h2>Our Solutions</h2>
      <p>
        Create your account quickly with just your email or social media login. Then explore a wide range.
      </p>
      <div className="solutions-grid">
        {courses.map((course, index) => (
          <div className="solution-card" key={index}>
            <div className="solution-icon"><img src={course.icon} alt=''/></div>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="price"><p><span className='price-i'>Price: </span>{course.price}</p>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Solutions;
