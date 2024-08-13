import HomeData1 from '../assets/images/img_home_data1.png';
import HomeData2 from '../assets/images/img_home_data2.png';
import HomeDataDetail1 from '../assets/images/img_data1_1.png';
import HomeDataDetail2 from '../assets/images/img_data1_2.png';
import HomeDataDetail3 from '../assets/images/img_data2_1.png';
import HomeDataDetail4 from '../assets/images/img_data2_2.png';

export const HomeData = [
  {
    id: 1,
    image      : HomeData1,
    title      : '압사 예방 자세',
    createdAt  : '2024.04.17',
    description: '할로윈데이를 맞은 지난 29일 서울 이태원 거리에는 대규모 인파가 한꺼번에 몰리면서 좁은 골목길을 빠져나가지 못한 사람들이 압사 사고를 당하는 충격적인 사건이 발생하였습니다.',
    detail     : [
      {
        image: HomeDataDetail1,
        description: '공연장이나 축제행사장에서 비상시 압사(질식)사고를 예방하는 자세로는 \'상체 앞쪽으로 팔짱을 끼는것\'으로 사람의 신체 조건에 따라 약간씩은 다르지만 일반적으로 이 자세를 하면 가슴 앞쪽 부분에 10~20센티 정도의 공간을 확보 할 수 있습니다.'
      },
      {
        image: HomeDataDetail2,
        description: '공연장을 빠져나온 후에도 가슴 및 복부 통증이 계속 되면 꼭 근처에 있는 병원에 방문하시길 바랍니다.'
      }
    ]
  },
  {
    id: 2,
    image      : HomeData2,
    title      : '이유 모를 복통',
    createdAt  : '2024.08.12',
    description: '복통은 매우 흔한 증상으로, 다양한 원인에 의해 발생할 수 있습니다. 때로는 원인을 알기 어려운 복통이 생기기도 하는데 원인들을 살펴보고, 이에 대한 적절한 대처 방법을 제시하고자 합니다.',
    detail     : [
      {
        image: HomeDataDetail3,
        description: '복통은 소화불량, 스트레스, 불안, 과민성 대장 증후군, 위장염, 약물 부작용 등의 이유로 발생합니다. 복통이 생겼을 때 휴식과 안정을 취하고 음식 섭취를 조절하시는 것이 좋습니다. 추가적으로 복부 온찜질을 해주면 좋습니다.'
      },
      {
        image: HomeDataDetail4,
        description: '이러한 대처를 했음에도 복통이 계속된다면 진통제, 소화제 등을 복용거나 의료 전문가와 상담하시길 바랍니다.'
      }
    ]
  }
]
