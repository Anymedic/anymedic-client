import './Talk.scss';
import SearchIcon from '../assets/images/icon_search.png';
import EmergencyIcon from '../assets/images/icon_emergency.png';
import EmergencySearchIcon from '../assets/images/icon_search_emergency.png';
import {Bell, X, ChevronRight, Mic} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import Modal from "react-modal";
import Loading from "../components/Loading";
import axios from "axios";

const Talk = () => {
  const [loading, setLoading] = useState(true)
  const [hasLoc, setHasLoc] = useState(false)
  const [loc, setLoc] = useState({x: 0, y: 0})

  const [result, setResult] = useState([]);

  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activateHistory, setActivateHistory] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchHistory, setSearchHistory] = useState<Array<string>>([])

  const setHistoryToValue = (e: any, reason: string) => {
    e.stopPropagation();
    setSearchValue(reason);
    setActivateHistory(false);
    return;
  }

  const onSearch = async (e: any) => {
    e.stopPropagation();
    setActivateHistory(false)
    try {
      const {data: res} = await axios.post(`https://api.anymedic.store/v1/hospital/prompt`, {
        prompt   : searchValue,
        latitude : loc.x,
        longitude: loc.y
      })
      const {data} = res;

      const localHistory = localStorage.getItem('local-history');
      let parsedHistory = [];
      if(localHistory) {
        parsedHistory = JSON.parse(localHistory);
      }
      const newHistory = parsedHistory.concat(data)
      const stringifyHistory = JSON.stringify(newHistory.reverse());
      localStorage.setItem('local-history', stringifyHistory)

      // const localSearchHistory = localStorage.getItem('search-history')
      // let parsedSearchHistory = [];
      // if(localSearchHistory){
      //   parsedSearchHistory = JSON.parse(localSearchHistory);
      // }
      // const newSearchHistory = parsedSearchHistory.concat([searchValue])
      // localStorage.setItem('search-history', newSearchHistory)
      // setSearchHistory(newSearchHistory.reverse().slice(0, 3))

      setResult(data);
    } catch (e: any) {
      setResult([]);
    } finally {
      setSearchLoading(false)
    }
  }

  const removeHistory = (e: any, index: number) => {
    e.stopPropagation();
    setSearchHistory(prev => prev.filter((el, idx) => index !== idx))
  }

  useEffect(() => {
    const localSearchHistory = localStorage.getItem("search-history")
    if(localSearchHistory) {
      const history = JSON.parse(localSearchHistory)
      setSearchHistory(history.reverse().slice(0, 3))
    }
  }, [])

  const closeDetail = () => {
    setSelectedResult(null)
  }

  useEffect(() => {
    window.addEventListener('click', (e) => {
      // @ts-ignore
      if(!inputRef.current || inputRef.current.contains(e.target)) {
        return;
      }
      setActivateHistory(false);
    })
  }, [])

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
          setTimeout(() => {
            setLoading(false)
          }, 500)
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
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [])

  return (
    <>
      {loading &&
        <Loading/>
      }
      {!loading &&
        <div className='talk'>
          {selectedResult &&
            <Modal isOpen={Boolean(selectedResult)}
                   className={'talk-detail-modal'}
                   overlayClassName={'modal-overlay'}
                   ariaHideApp={false}
                   onRequestClose={closeDetail}>
              <div className="talk-detail-modal-content">
                <div className="talk-detail-modal-header">
                  <span className='talk-detail-modal-reason'>{selectedResult.reason}</span>
                  <X width={20} onClick={() => closeDetail()}/>
                </div>
                <div className='talk-detail-modal-divide'/>
                <div className="talk-detail-modal-main">
              <span className="talk-detail-modal-main-head">
                증상 원인 설명
              </span>
                  <span className="talk-detail-modal-main-description">
                {selectedResult.detail.description}
              </span>
                  <span className="talk-detail-modal-main-head">
                대처하면 좋은 방안
              </span>
                  <span className="talk-detail-modal-main-description">
                {selectedResult.detail.manage}
              </span>
                  {selectedResult.detail?.hospital &&
                    <>
                      <div className="talk-detail-modal-main-hospital">
                        <div className="talk-detail-modal-main-hospital-top">
                      <span className="talk-detail-modal-main-hospital-name">
                        {selectedResult.detail.hospital.name}
                      </span>
                          <span className="talk-detail-modal-main-hospital-distance">
                        {`${selectedResult.detail.hospital.distance.toFixed(0)}m`}
                      </span>
                        </div>
                        <span className="talk-detail-modal-main-hospital-address">
                      {selectedResult.detail.hospital.address}
                    </span>
                        <span className="talk-detail-modal-main-hospital-subject">
                    {`진료과목: ${selectedResult.detail.hospital.subject}`}
                    </span>
                      </div>
                      <div className='talk-detail-modal-main-isEmergency'>
                        {selectedResult.detail.emergency &&
                          <span style={{marginBottom: 20}}>정확한 진단이 필요해요! <strong
                            style={{color: '#FFAE00'}}>119 신고하기</strong></span>
                        }
                        <a href={`sms:01032853887&body=응급한 상황입니다.`}>
                          <img className='talk-detail-modal-main-isEmergency-image' src={EmergencyIcon} alt=""/>
                        </a>

                      </div>
                    </>
                  }
                </div>
              </div>
            </Modal>
          }
          <div className="talk-search-wrapper" ref={inputRef} onClick={() => setActivateHistory(true)}>
            <div className="talk-search">
              <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="talk-search-input"
                placeholder={'아픈 부위, 상태, 기간 등을 설명해주세요'}/>
              <div className='talk-search-icons'>
                <Mic color={'#AEAEAE'}/>
                <img className='talk-search-icon' src={SearchIcon} alt="search" onClick={(e) => {
                  setSearchLoading(true)
                  onSearch(e)
                }}/>
              </div>
            </div>
            {(activateHistory && searchHistory.length !== 0) &&
              <div className="talk-search-history">
                {searchHistory.map((el, index) =>
                  <div className='talk-search-history-item'
                       onClick={(e) => setHistoryToValue(e, el)}>
                    {el}
                    <X cursor={'pointer'} width={14} onClick={(e) => removeHistory(e, index)}/>
                  </div>
                )}
              </div>
            }
          </div>
          {result.length === 0 &&
            <div className="talk-info">
              <Bell width={20} color={'#868686'}/>
              <div className="talk-info-text">
                {"안내되는 증상의 원인 및 대처방안은\n"}
                <strong>생성형 AI</strong>{"를 통해 제공되는 정보입니다.\n\n"}
                {"실제 의료 행위를 대신 할 수 없는 정보이니\n" +
                  "참고용으로 이용해주시고"}
                <strong>{" 가까운 의료기관을\n" + "방문하여 정확한 진단"}</strong>을 받으시기 바랍니다.
              </div>
            </div>
          }
          {
            searchLoading && <Loading/>
          }
          {(!searchLoading && result.length !== 0) &&
            <div className='talk-result'>
              <span className='talk-result-count'>{`검색결과: ${result.length}`}</span>
              <div className="talk-result-item-wrapper">
                {result.map((el: any) =>
                  <div className='talk-result-item' onClick={() => setSelectedResult(el)}>
                    {el.detail.emergency &&
                      <img className='talk-result-item-icon' src={EmergencySearchIcon} alt=""/>
                    }
                    <span className='talk-result-item-reason'>{el.reason}</span>
                    <ChevronRight width={20}/>
                  </div>
                )}
              </div>

            </div>
          }
        </div>
      }
    </>
  );
};

export default Talk;
