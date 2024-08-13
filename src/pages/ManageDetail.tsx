import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {HomeData} from "../constants/home.data";
import {ChevronLeft} from "lucide-react";
import './ManageDetail.scss';

const ManageDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<any>(null)
  useEffect(() => {
    if(id) {
      const detailData = HomeData.find(el => el.id === Number(id));
      if(detailData) {
        setDetail(detailData)
      }
    }
  }, [id])
  return (
    <>
      {detail &&
        <div className='manage-detail'>
          <div className="manage-detail-image-wrapper">
            <img src={detail.image} className="manage-detail-image" alt={'.'}/>
            <ChevronLeft width={20} className={'manage-detail-image-arrow'}
                         onClick={() => navigate('/')}
            />
          </div>
          <div className="manage-detail-content">
            <div className="manage-detail-content-top">
              <span className='manage-detail-content-title'>
                {detail.title}
              </span>
              <span className='manage-detail-content-date'>
                {detail.createdAt}
              </span>
            </div>
            <div className="manage-detail-content-description">
              {detail.description}
            </div>
            <div className="manage-detail-content-more-wrapper">
              {detail.detail.map((el: any) =>
                <div className="manage-detail-content-more">
                  <img className='manage-detail-content-more-image' src={el.image} alt="."/>
                  <span className='manage-detail-content-more-description'>
                    {el.description}
                  </span>
                </div>
              )}
            </div>


          </div>

        </div>
      }
    </>
  );
};

export default ManageDetail;
