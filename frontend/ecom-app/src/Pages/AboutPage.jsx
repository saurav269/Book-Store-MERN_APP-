import React from 'react'
import Layout from '../Components/Layout/Layout'
import SAURAV from '../assests/saurav.png'

const AboutPage = () => {
  return (
<Layout title={"About me - Book Store App"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={SAURAV}
            alt="contactus"
            style={{ 
              width: "40%",
              // border:"1px solid black",
              boxShadow: "0px 8px 6px -6px black", 
              borderRadius : '50%', }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="abtH1">ABOUT ME</h1>
          <p className="text-justify mt-2">
              A meticulous and diligent aspiring Full StackWeb 
              developer well versed in HTML, CSS, JS,React, and
              MERN stack with 1200 hours+ ofhands-on coding experience.
              Have the ability toutilize full-stack web development
              expertise tobuild a user-responsive website. 
              Seeking asignifi cant position in a reputed organization
              toutilize and enhance the knowledge and skills.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
