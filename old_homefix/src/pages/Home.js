import React from 'react';
import '../styles/Home.css'; // Import CSS file
import FirstNavBar from '../components/FirstNavBar'
function Home() {

  // // Get the subMenu element.
  // const subMenu = document.getElementById('subMenu');

  // // Toggle the visibility of the subMenu element when the noti icon is clicked.
  // const notiIcon = document.querySelector('.noti');
  // notiIcon.addEventListener('click', () => {
  // subMenu.classList.toggle('open-menu');
  // });
  
  return (
    
    <div>
      <FirstNavBar/>
      <main>
        <div className="mid-img">
          <img className="mi" src="../img/homepic.png" alt="Hình ảnh trang chủ" />
        </div>

        <div className="end-note">
          <h4 className="qua">Quality Improvements and Repairs</h4>
          <p>You can be sure that Homefix are reliable and will return your call. We are punctual and we will complete the job with superb attention-to-detail so all work is to the highest standard. Fully guaranteed and insured.</p>
        </div>
      </main>
    </div>
  );
}

export default Home;


// import React from 'react'

// function Home() {
//   return (
//     <div>Hello world</div>
//   );
// }

// export default Home