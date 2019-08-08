import React from 'react';
import styled from 'styled-components';

const ContactUsContainer = styled.div`
  margin: 50px 0;
  background-color: ${props => props.theme.bgLight};
  
  label {
    width: 100%;
  }
`;

const ContactUs = () => (
  <ContactUsContainer>
    <div className="container">
      <div className="row section-heading">
        <div className="col-12 text-center">
          <h3 className="section-sub-title">CONTACT FORM</h3>
          <h2 className="section-title">Get In Touch</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-offset-3 col-md-6">
          <form action="#">
            <h2>Contact Form</h2>
            <div className="row form-group">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="fname">First Name
                  <input type="text" id="fname" className="form-control" />
                </label>
              </div>
              <div className="col-md-6">
                <label htmlFor="lname">Last Name
                  <input type="text" id="lname" className="form-control" />
                </label>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <label htmlFor="email">Email 
                  <input type="email" id="email" className="form-control" />
                </label>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <label htmlFor="subject">Subject 
                  <input type="subject" id="subject" className="form-control" />
                </label>             
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <label htmlFor="message">Message
                  <textarea name="message" id="message" cols="30" rows="7" className="form-control" placeholder="Write your notes or questions here..."></textarea>
                </label>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <input type="submit" value="Send Message" className="btn btn-black" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>    
  </ContactUsContainer>
)

export default ContactUs;
