import React from 'react';
import '../assets/Fabrics.css'; 

// 1. Data Structure (moved from repetitive HTML to a clean JS array)
const fabrics = [
  {
    name: 'Acoustic, Masking and Blackout',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/Acoustic-Masking-Blackout-Main-Image-410x309.jpg',
    href: '/product-category/fabric/acoustic-masking-blackout-fabric',
    alt: 'Fabric for acoustic, masking and blackout purposes',
  },
  {
    name: 'Chroma Key',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/chroma-key-main-image-410x309.jpg',
    href: '/product-category/fabric/chroma-key',
    alt: 'Chroma Key fabric for video production',
  },
  {
    name: 'Decorative and Display',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/Decorative-Display-MAIN-IMAGE-min-410x309.jpeg',
    href: '/product-category/fabric/decorative-display',
    alt: 'Decorative and Display fabric',
  },
  {
    name: 'Digital Print',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/Digital-Print-Main-Image-410x309.png',
    href: '/product-category/fabric/digital-print',
    alt: 'Digital Print fabric',
  },
  {
    name: 'Flooring',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/Flooring-410x309.png',
    href: '/product-category/fabric/flooring',
    alt: 'Flooring materials',
  },
  {
    name: 'Muslin, Canvas and Scenic',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/Muslin-Canvas-Scenic-MAIN-IMAGE-min-410x309.jpg',
    href: '/product-category/fabric/muslin-canvas-scenic',
    alt: 'Muslin, Canvas, and Scenic fabric',
  },
  {
    name: 'Projection Screens',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/IMG_3708-410x309.jpeg',
    href: '/product-category/fabric/projection-screens',
    alt: 'Projection Screens material',
  },
  {
    name: 'Scrim, Gauze and Netting',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/Scrim-Gauze-Netting-Main-Image-410x309.png',
    href: '/product-category/fabric/scrim-gauze-netting',
    alt: 'Scrim, Gauze, and Netting fabric',
  },
  {
    name: 'Sheers, Silks and Satins',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/Sheers-Silks-Satins-MAIN-IMAGE-410x309.jpg',
    href: '/product-category/fabric/sheers-silks-satins',
    alt: 'Sheers, Silks, and Satins fabric',
  },
  {
    name: 'Velvet - Natural',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/Velvet-Natural-410x309.png',
    href: '/product-category/fabric/velvet-natural',
    alt: 'Natural Velvet fabric',
  },
  {
    name: 'Velvet - Synthetic',
    imageSrc: 'https://www.jcjoel.com/wp-content/uploads/2023/07/Synthetic-Velvet-Main-Image-410x309.png',
    href: '/product-category/fabric/velvet-synthetic',
    alt: 'Synthetic Velvet fabric',
  },
];

const Fabrics = ({ t }) => {
  return (
    
    <div  className="m-4" dir={t.dir} >
      <div className="container container--regular"> 
        <h2>{t.productsCategories.fabrics}</h2>
        <div className="row g-4">
          {/* 2. Using .map() to iterate over the data and render a component for each item */}
          {fabrics.map((category, index) => (
            // The 'key' prop is essential for list rendering in React
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}> 
            <div className="align-items-start">

              {/* Image and Link to the Category */}
              {/* Note: In a real app with React Router, you'd use a <Link to={...}> component instead of <a> */}
              <a className="" href={category.href}>
                <img 
                  src={category.imageSrc} 
                  className="image-fluid"
                  alt={category.alt} // Use a more specific alt text
                  loading="lazy" // Use loading="lazy" for better performance on images below the fold
                />
              </a>
              {/* Category Name */}
              <p className="mt-3"><strong>{category.name}</strong></p>
              
              {/* Button to View Products */}
              <a className="btn-primary" href={category.href}>
                View Products
              </a>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fabrics;