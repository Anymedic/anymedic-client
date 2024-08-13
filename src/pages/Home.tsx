import Banner from '../assets/images/img_home_banner.png';
import HomeTop from '../assets/images/img_home_top.png';
import './Home.scss';
import {HomeData} from "../constants/home.data";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='home'>
      <img className='home-banner' src={Banner} alt=""/>
      <div className="home-top">
        <img className='home-top-image' src={HomeTop} alt=""/>
      </div>
      <div className="home-content">
        {HomeData.map(el =>
          <div className='home-item' onClick={() => navigate(`/manage/${el.id}`)}>
            <img src={el.image} alt="." className="home-item-img"/>
            <div className="home-item-info">
              <div className="home-item-info-top">
                <span className='home-item-info-title'>
                  {el.title}
                </span>
                <span className='home-item-info-date'>
                  {el.createdAt}
                </span>
              </div>
              <span className="home-item-info-description">
                {el.description}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
