import React from 'react';
import './ContactUs.css'; // Assuming you have a CSS file for styling

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="max-width">
        <h2 className="title">Contact Us</h2>
        <div className="contact-content">
          
          <div className="column right" style={{ zIndex: 100 }}>
            <div className="text">Message</div>
            <form action="https://getform.io/f/ab4fdb25-af1b-4019-8146-c810b26f1146" method="POST">
              <div className="fields">
                <div className="field name">
                  <input type="text" placeholder="Name" name="Name" required />
                </div>
                <div className="field email">
                  <input type="email" placeholder="Email" name="Email" required />
                </div>
              </div>
              <div className="field" id = "subject">
                <input type="text" placeholder="Subject" name="Sub" required />
              </div>
              <div className="field textarea">
                <textarea cols="30" rows="10" placeholder="Message.." name="Content" required></textarea>
              </div>
              <div className="button-area">
                <button type="submit">Send message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
