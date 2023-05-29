import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '35rem',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const App = () => {
  // const onChange = (currentSlide) => {
  //   console.log(currentSlide);
  // };
  return (
    <Carousel >
            <header className="hero__image">
                <h1 className="hero__text">your next adventure starts right on your doorstep</h1>
            </header>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};
export default App;