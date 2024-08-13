import React, {useEffect, useState} from 'react';
import './Medicine.scss';
import {Bell} from "lucide-react";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import {FreeMode} from 'swiper/modules';
import {Drugs} from "../constants/drug.data";
import axios from "axios";
import Marker from '../assets/images/icon_marker.png';
import ListButton from '../assets/images/icon_drug_list.png';
import MapButton from '../assets/images/icon_drug_map.png';

const Tab = [
  {
    id   : 0,
    label: '종류'
  },
  {
    id   : 1,
    label: '상비약 판매점'
  }
]

// @ts-ignore
const {kakao} = window;

const Medicine = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className='medicine'>
      <div className="medicine-tab-wrapper">
        {Tab.map(el =>
          <div
            className={`medicine-tab ${el.id === tab ? 'selected' : ''}`}
            onClick={() => setTab(el.id)}>
            {el.label}
          </div>
        )}
      </div>
      <div className="medicine-content">
        {tab === 0 &&
          <Drug/>
        }
        {tab === 1 &&
          <DrugStore/>
        }
      </div>
    </div>
  );
};

export default Medicine;

const Drug = () => {
  return (
    <div className='drug'>
      <div className="drug-notice">
        <Bell color={'#868686'}/>
        <span className='drug-notice-text'>
          <strong>‘편의점 안전상비의약품 13품목’</strong>으로
          {"\n편의점에서 판매할 확률이 높아요!"}
        </span>
      </div>
      <div className="drug-items">
        {Drugs.map(el =>
          <div className='drug-row'>
            <span className='drug-row-title'>
              {el.category}
            </span>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={12}
              freeMode={true}
              draggable={true}
              modules={[FreeMode]}
              className="drug-swiper"
            >
              {el.items.map(elem =>
                <SwiperSlide className={'drug-swiper-slide'}>
                  <img className='drug-swiper-slide-img' src={elem.img} alt="img"/>
                  <span className='drug-swiper-slide-name'>{elem.name}</span>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  )
}

const DrugStore = () => {

  const [viewType, setViewType] = useState(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([])
  const [hasLoc, setHasLoc] = useState(false)
  const [loc, setLoc] = useState({x: 0, y: 0})

  const onClickViewType = () => {
    if(viewType === 0) {
      setViewType(1)
    } else {
      setViewType(0)
    }
  }

  const getStores = async () => {
    try {
      const {data: res} = await axios.get(`https://api.anymedic.store/v1/medicine-stores?latitude=${loc.x}&longitude=${loc.y}&range=${2000}`)
      // result to positions
      const {data} = res;
      const {latLonMedicineList} = data;
      setResult(latLonMedicineList)
      setLoading(false)

    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    if(hasLoc) {
      getStores();
    }
  }, [hasLoc, loc])

  useEffect(() => {
    if(viewType === 0) {
      const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(loc.x, loc.y), //지도의 중심좌표.
        level : 3 //지도의 레벨(확대, 축소 정도)
      };
      // const imageOption = {offset: new kakao.maps.Point(27, 69)};

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      // map.setZoomable(false)

      if(result.length !== 0) {
        const positions = result.map((el: any) => {
          return {
            title : el.name,
            latlng: new kakao.maps.LatLng(el.latitude, el.longitude)
          }
        })

        for (let i = 0; i < positions.length; i++) {

          const imageSize = new kakao.maps.Size(28, 34);
          const markerImage = new kakao.maps.MarkerImage(Marker, imageSize);
          const marker = new kakao.maps.Marker({
            map     : map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title   : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image   : markerImage // 마커 이미지
          });

          const content = '<div class="custom-overlay">' +
            `  <a href=${`https://map.kakao.com/link/search/${encodeURI(positions[i].title)}`} class="custom-overlay-wrapper" target="_blank">` +
            `    <span class="title">${positions[i].title}</span>` +
            '  </a>' +
            '</div>';

          const customOverlay = new kakao.maps.CustomOverlay({
            map     : map,
            position: positions[i].latlng, // 마커를 표시할 위치
            content : content,
            yAnchor : 1
          });
        }
      }
    }
  }, [result, viewType])

  useEffect(() => {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          setHasLoc(true)
          setLoc({
            x: latitude,
            y: longitude
          })
        },
        (error) => {
        },
        {
          enableHighAccuracy: true, // 정확도 우선 모드
          timeout           : 10000,           // 10초 이내에 응답 없으면 에러 발생
          maximumAge        : 0             // 항상 최신 위치 정보 수집
        }
      );
    } else {
    }
  }, [viewType])

  return (
    <div className='drug-store'>
      {viewType === 0 &&
        <div id="map" style={{width: '100%', height: 400, borderRadius: 5}}/>
      }
      {viewType === 1 &&
        <div className='drug-store-list'>
          {result.map((el: any) =>
            <>
              <div className='drug-store-row' onClick={() => window.open(`https://map.kakao.com/link/search/${encodeURI(el.name)}`)}>
                <div className="drug-store-row-top">
                  <span className="drug-store-name">
                    {el.name}
                  </span>
                  <span className="drug-store-distance">
                  {`${el.distance.toFixed(0)}m`}
                  </span>
                </div>
                <span className="drug-store-address">
                  {el.roadAddress}
                </span>
              </div>
              <div className='drug-store-divide'/>
            </>
          )}
        </div>
      }
      <img src={viewType === 0 ? ListButton : MapButton} className="drug-view-button" alt={'button'}
           onClick={() => onClickViewType()}/>

    </div>

  )
}
