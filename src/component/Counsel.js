import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Coursel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const products =[
    {
      id: 1,
      name:"Cartoon Pandas",
      descripation: "this is cartoon product that serves in the market this is most popular for the child",
      image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    },
    {
      id: 2,
      name:"Cartoon Pandas",
      descripation: "this is cartoon product that serves in the market this is most popular for the child",
      image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    },
    {
      id: 3,
      name:"Cartoon Pandas",
      descripation: "this is cartoon product that serves in the market this is most popular for the child",
      image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    },
    {
      id: 4,
      name:"Cartoon Pandas",
      descripation: "this is cartoon product that serves in the market this is most popular for the child",
      image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // },
    // {
    //   id: 5,
    //   name:"Cartoon Pandas",
    //   descripation: "this is cartoon product that serves in the market this is most popular for the child",
    //   image: "https://www.animaker.com/hub/wp-content/uploads/2023/03/Cartoon-Characters-Banner.png",
    // }
  ]

  return (
    <Slider {...settings} className='mt-74 gap-2 slick_slider'>
      {products.map((product) => (
        <div key={product.id}>
          {/* <h3>{product.name}</h3>
          <p>{product.description}</p> */}
          <img src={product.image} alt={product.name} style={{width:"100%", height: "100%"}} />
        </div>
      ))}
    </Slider>
  );
};

export default Coursel;