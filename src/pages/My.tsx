import './My.scss';
import {ChevronLeft, X} from "lucide-react";
import {useEffect, useState} from "react";
import {Drawer, DrawerContent, DrawerOverlay, useDisclosure} from "@chakra-ui/react";

const My = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [askHistory, setAskHistory] = useState<any>([])
  const [selectedHistory, setSelectedHistory] = useState<any>(null)

  const openHistory = (el: any) => {
    setSelectedHistory(el);
    onOpen();
  }

  const onDeleteHistory = (e: any, history: any) => {
    e.stopPropagation();
    const filteredHistory = askHistory.filter((el: any) => el !== history);
    setAskHistory(filteredHistory.reverse())
    localStorage.setItem('local-history', JSON.stringify(filteredHistory.reverse()))
  }

  const onDeleteHistoryInside = (e: any, history: any) => {
    onClose();
    onDeleteHistory(e, history)
  }

  const onDeleteAllHistory = () => {
    setAskHistory([])
    localStorage.removeItem('local-history')
  }

  useEffect(() => {
    const history = localStorage.getItem('local-history')
    if(history) {
      const parseHistory = JSON.parse(history);
      setAskHistory(parseHistory.slice(0, 10))
    }

  }, [])

  return (
    <div className='my'>
      {selectedHistory &&
        <Drawer isOpen={isOpen} onClose={onClose} placement={'bottom'}>
          <DrawerOverlay/>
          <DrawerContent className='history-detail-wrapper'>
            <ChevronLeft className='history-detail-arrow' onClick={() => onClose()}/>
            <div className="history-detail">
              {/*<span className='history-detail-date'>*/}
              {/*  {selectedHistory.createdAt}*/}
              {/*</span>*/}
              <span className='history-detail-title'>
                {selectedHistory.reason}
              </span>
              <div className='history-detail-divide'/>
              <span className='history-detail-index-title'>
                증상 원인 설명
              </span>
              <span className="history-detail-index-text">
                {selectedHistory.detail.description}
              </span>
              <span className='history-detail-index-title'>
                대처하면 좋은 방안
              </span>
              <span className="history-detail-index-text">
                {selectedHistory.detail.manage}
              </span>
              {
                selectedHistory.detail?.hospital &&
                <div className="history-detail-hospital">
                  <div className="history-detail-hospital-top">
                    <span className='history-detail-hospital-name'>{selectedHistory.detail.hospital.name}</span>
                    <span
                      className='history-detail-hospital-distance'>{`${selectedHistory.detail.hospital.distance.toFixed(0)}m`}</span>
                  </div>
                  <span className='history-detail-hospital-address'>
                  {selectedHistory.detail.hospital.address}
                </span>
                  <span className='history-detail-hospital-subject'>
                  {`진료 과목: ${selectedHistory.detail.hospital.subject}`}
                </span>
                </div>
              }
            </div>
            <span className='history-detail-delete' onClick={(e) => onDeleteHistoryInside(e, selectedHistory)}>
              삭제하기
            </span>
          </DrawerContent>
        </Drawer>
      }
      <div className="my-header">
        <div className="my-header-left">
          {/*<ChevronLeft />*/}
          <span className='my-header-title'>
            검색 기록
          </span>
        </div>
        <span className='my-header-delete' onClick={() => onDeleteAllHistory()}>
          모두 지우기
        </span>
      </div>
      <div className="my-history-wrapper">
        {askHistory.length === 0 &&
          <div className='my-history-empty'>
            저장된 검색 기록이 존재하지 않습니다.
          </div>
        }
        {askHistory.length !== 0 &&
          <>
            {askHistory.map((el: any) =>
              <div className='my-history' onClick={() => openHistory(el)}>
                <span className='my-history-title'>{el.reason}</span>
                <X width={16} onClick={(e) => onDeleteHistory(e, el)}/>
              </div>
            )}
          </>
        }

      </div>

    </div>
  );
};

export default My;
