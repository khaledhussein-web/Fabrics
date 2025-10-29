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

// const Footer = ({ t, dir }) => {
//   return (
//     <footer className="footer" dir={dir}> 
//       <p>
//         © {t?.footer.date} {t?.footer.StageWare|| "Stage Ware"}  
//         {t?.footer?.rightsReserved || "- All rights reserved."} 
//       </p>
//     </footer>
//   );
// };

const Footer = ({ t, dir }) => {
  return (
    <footer className="footer" dir={dir}> 
      <p>
        {/* We explicitly add the spaces and separator here */}
        © {t?.footer.date} {t?.footer.StageWare} - {t?.footer.rightsReserved} 
      </p>
    </footer>
  );
}

export default Footer;