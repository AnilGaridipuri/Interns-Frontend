import React from 'react'
import YoutubeVideo from '../youtubeVideo'
import URLBox from '../urlBox'

function WebLearn() {
  return (
    <div className='webLearnDiv'>
      <div className='topicDefinition'>
        <h2>What is it❓❓</h2>
        <p className='defPara'>
        <strong>Web development</strong> refers to the creating, building, and maintaining of websites. It includes aspects such as web design, web publishing, web programming, and database management. It is the creation of an application that works over the internet i.e. websites.
        </p>
        <p className='defPara'><strong>Frontend Development,&nbsp;</strong>
        The part of a website where the user interacts directly is termed as front end. It is also referred to as the ‘client side’ of the application.</p>
        <p className='defPara'><strong>Backend Development,&nbsp;</strong>
        Backend is the server side of a website. It is part of the website that users cannot see and interact with. It is the portion of software that does not come in direct contact with the users. It is used to store and arrange data.</p><br/>

        <p className='defPara'>While you are going to start learning something new, you can’t directly jump into practical implementation of it.<br/>You need to have a <strong>Strong Foundation of Basic Concepts</strong>.</p>
        <p className='defPara'>Believe us without that it’ll be very hard in the way middle. <strong>We’ve experienced it.</strong><br/>And <strong>Yes We Know,</strong> it’ll be boring💤💤 to just sit & listen to few videos or read some articles, But it’s the only way we got to understand the basics first.</p><br/>
        <p className='defPara'>With some basics on Designing, <strong>You can start Designing.</strong><br/>With some basics on Front End Technologies, <strong>You can start Developing the Front End.</strong><br/>With some basics on Back  End Technologies, <strong>You can start Developing the Back End.</strong></p>
        <p className='defPara'>So with all that, <strong>Let’s Get Started !!</strong></p>
      </div>
        
      <h2>What is Full Stack Web Development 🤷🤷‍♀️❓❓</h2>
      <YoutubeVideo 
        src='https://www.youtube.com/embed/8KaJRw-rfn8'
      />

      <h2>What is Front End Web Development 💻💻❓❓</h2>
      <YoutubeVideo 
        src='https://www.youtube.com/embed/WG5ikvJ2TKA'
      />

      <h2>What is Back End Web Development 🖥️🖥️❓❓</h2>
      <YoutubeVideo 
        src='https://www.youtube.com/embed/WG5ikvJ2TKA'
      />

      <h2>Front-End Development <span className='redText'>vs</span> Back-End Development <span className='redText'>vs</span> Full Stack Development 🤔🤔</h2>
      <YoutubeVideo 
        src='https://www.youtube.com/embed/8BJyJ1ZJKwo'
      />
      
      <h2>What is the process involved in building a website ❓</h2>
      <URLBox 
        href='https://blog.hubspot.com/website/website-development'
        title='How it is done?'
        desc='Read this article'
      />

      <h2>Front-End Resources</h2>
      <p>If you already have an idea on HTML&CSS, you can skip these YouTube videos and get into the HTML&CSS certification given by freeCodeCamp.</p>
      <YoutubeVideo 
        src='https://www.youtube.com/embed/gG3tTJRrzeA'
      />
      <YoutubeVideo 
        src='https://www.youtube.com/embed/qz0aGYrrlhU'
      />
      <YoutubeVideo 
        src='https://www.youtube.com/embed/T5P_umD_XGw'
      />
      <YoutubeVideo 
        src='https://www.youtube.com/embed/Icf5D3fEKbM'
      />
      
      <h2>For any kind of doubt in HTML, Go to the below website and search for it.</h2>
      <p>You can find all the HTML tags in an order and a detailed explanation of how to use them will be shown in this site 👇👇👇</p>
      <URLBox 
        href='https://www.w3schools.com/html/default.asp' 
        title='HTML Tutorial'
        desc='HTML stands for Hyper Text Markup Language. HTML is the standard markup language for creating Web pages.'
      />

      <h2>For any kind of doubt in CSS, Go to the below website and search for it.</h2>
      <p>You can find all the CSS rules and a detailed explanation of how to use them will be shown in this site 👇👇👇</p>
      <URLBox 
        href='https://www.w3schools.com/css/default.asp' 
        title='CSS Tutorial'
        desc='CSS is the language we use to style an HTML document. CSS describes how HTML elements should be displayed.'
      />

      <p>In fact, To get a better idea, it’s good to read all sections present in above two websites and play with the code already present in it.</p>

      <h4>After Watching above videos, Try to code a HTML&CSS site by watching the below video.<br/> We are not asking you to write code on your own without seeing !!!<br/>
      Just see the video, Understand the code written by him and then write the same code on your laptop.</h4>

      <YoutubeVideo 
        src='https://www.youtube.com/embed/CQZxeoQeo5c'
      />
      <p>Let’s make this more interesting.</p>
      <h2>And here comes the EXCITING part of learning HTML&CSS 🤯🤩🤯🤩🤯🤩</h2>
      <p>A Free HTML&CSS Certification from freeCodeCamp</p>
      <URLBox 
        href='https://www.freecodecamp.org/learn/2022/responsive-web-design/' 
        title='Responsive Web Design'
        desc="You'll learn how to make webpages that respond to different screen sizes by using Flexbox, Grid, Media Queries. And also basic CSS Transitions & Animations."
      />
      <p>If You have reached this point by completing all above steps. </p>
      <p><strong>Congratulations 👏👏👏👏<br/>
        You have done a great job that hundreds of students couldn’t do 🫡🫡🫡🫡</strong>
      </p>
      <p>With all this knowledge You can start with some Front-End Frameworks & Libraries.</p>
    </div>
  )
}

export default WebLearn









