import React from 'react';
import './About.css';

import dv from '../../resources/divya.jpeg'
import cc from '../../resources/chahat.jpeg'
import an from '../../resources/ankita.jpeg'
import ta from '../../resources/taniya.jpeg'
import pr from '../../resources/priya.jpeg'

const teamMembers = [
  { name: 'Divya Dwivedi', photo: dv },
  { name: 'Priya Singh', photo: pr },
  { name: 'Chahat Chopra', photo: cc },
  { name: 'Ankita Singh', photo: an },
  { name: 'Taniya', photo: ta },
];

const About = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        Our project focuses on e-waste management, specifically targeting e-rickshaws,
        which often have issues with chargers and controllers. We take a holistic
        approach that could attract customers who prioritize both affordability and
        eco-friendliness. Here's how it works:
      </p>
      <div class="steps-container">
        <div class="step">
          <div class="step-icon">
            <i class="fas fa-recycle"></i>
          </div>
          <p>We collect e-waste consisting of chargers and controllers from e-rickshaws.</p>
        </div>
        <div class="step">
          <div class="step-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <p>We provide this e-waste to engineering students for practical learning and repair.</p>
        </div>
        <div class="step">
          <div class="step-icon">
            <i class="fas fa-store"></i>
          </div>
          <p>Subsequently, we sell refurbished chargers and controllers at affordable prices through our website.</p>
        </div>
      </div>
      <div class="highlight-box">
        <p>
          This initiative aims to reduce e-waste, promote practical education for
          engineering students, and provide sustainable solutions in the long run.
        </p>
      </div>
      <h3>Meet Our Team</h3>
      <div className="team-container">
        {teamMembers.map((member) => (
          <TeamMember key={member.name} name={member.name} photo={member.photo} />
        ))}
      </div>
    </div>
  );
};

const TeamMember = ({ name, photo }) => {
  return (
    <div className="team-member">
      <img src={photo} alt={name} />
      <h4>{name}</h4>
    </div>
  );
};

export default About;
