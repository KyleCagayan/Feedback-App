import React from "react";
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";

// current Link is an object that sends the user to '/about' and also sends a query parameter of ?sort=name
// you can also make it go to a specific hash
// http://localhost:3000/about?sort=name#hello
// function AboutIconLink() {
//   return (
//     <div className="about-link">
//       <Link to={{pathname: '/about',
//     search: '?sort=name',
//     hash: '#hello'}}>
//         <FaQuestion size={30} />
//       </Link>
//     </div>
//   );
// }

function AboutIconLink() {
    return (
      <div className="about-link">
        <Link to='/about'>
          <FaQuestion size={30} />
        </Link>
      </div>
    );
  }

export default AboutIconLink;

// do not use "a" tags with react because it causes the page to refresh.
// keep all page changes done on client side using a link in router dom
