// import React from 'react';
// const Footer = () => {
//   return (
//     <footer>
//       <p>© 2025 StageWare. All rights reserved.</p>
//     </footer>
    // 
    // {/* ====== FOOTER ====== */}
    //   <footer>
    //     <p>
    //       © {new Date().getFullYear()} {t?.brand || "StageWare"}. All rights
    //       reserved.
    //     </p>
    //   </footer>
//     );
// };
// 
// export default Footer;


import React from 'react';

// Footer.jsx

const Footer = ({ t, dir }) => {
  return (
    <footer className="footer" dir={dir}> 
      <p>
        © {new Date().getFullYear()} {t?.brand || "- StageWare"}  
        {t?.footer?.rightsReserved || "All rights reserved."} 
      </p>
    </footer>
  );
};

export default Footer;