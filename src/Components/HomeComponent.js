import React, { Component ,useState   } from 'react';
import {Carousel,CarouselCaption,CarouselIndicators,CarouselItem,CarouselControl,
            Card,CardImg,CardImgOverlay ,CardTitle  } from 'reactstrap';
import {Link} from 'react-router-dom';


class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            category:[{name:"Grocery", _id:1, image:window.location.origin+"/assets/images/Grocery.png"},
                      {name:"Cloth", _id:2,image:window.location.origin+"/assets/images/Cloth.png"},
                      {name:"Other",_id:1,image:window.location.origin+"/assets/images/Other.png"}],
            search: "",
            activeIndex :0, 
            animating :false, 
        };
       
    }
    
    render(){
      
      
      const Example = (props) => {
        const [activeIndex, setActiveIndex] = useState(0);
        const [animating, setAnimating] = useState(false);
      
        const next = () => {
          if (animating) return;
          const nextIndex = activeIndex === this.props.notice.notice.length - 1 ? 0 : activeIndex + 1;
          setActiveIndex(nextIndex);
        }
      
        const previous = () => {
          if (animating) return;
          const nextIndex = activeIndex === 0 ? this.props.notice.notice.length - 1 : activeIndex - 1;
          setActiveIndex(nextIndex);
        }
      
        const goToIndex = (newIndex) => {
          if (animating) return;
          setActiveIndex(newIndex);
        }
      
        const slides =  this.props.notice.notice.map((notice) => {
          return (
            <CarouselItem
              className="custom-tag "
              tag="div"
              key={notice.id}
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
            >
              <img src={notice.image} alt={notice.name} height="300 px" width="100%" />
              <CarouselCaption className="text-danger" captionText={notice.name} captionHeader={notice.description} />
            </CarouselItem>
          );
        });
      
        return (
          <div >
           {
             (this.props.notice.notice.length!=0)  ?
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                  <CarouselIndicators items={this.props.notice.notice} activeIndex={activeIndex} onClickHandler={goToIndex} />
                  {slides}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
              </Carousel>
            :
              <div></div>
           }
          </div>
              );
      }
      const menu = this.state.category.map((item) => {
        return (
            <div key={item._id} className="col-12 col-md-5 ml-1 mt-3">
                <RenderMenuItem item={item} />
            </div>
        );
      });
        return (
          <div >
             <div className="container">
              <div className="row row-content">
                <div className="d-flex justify-content-center ">
                  <Example/>
                </div>
            </div>
            </div>
            <div className="container">
              <div className="row row-content">
                  {menu}
              </div>
            </div>
          </div>
          );
    }
}
function RenderMenuItem({ item, onClick }) {
  return(
      <Card >
          <Link to={'/home/'+item.name} >
              <CardImg height="300px" src={item.image} alt={item.name} />
              <CardTitle tag="h2" className="d-flex justify-content-center">{item.name}</CardTitle>
          </Link>
      </Card>
  );
}

export default Home;