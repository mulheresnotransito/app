import styled from 'styled-components/native';

export const BtnCTA = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 40px;
  border-color: ${props => props.borderColor || "#C43A57"};
  background-color: ${props => props.bgColor || "#C43A57"};
  margin-top: 10px;
  margin-bottom: 10px;
  width: ${props => props.width || "70%"};
  padding: 15px;
`;

export const TxtBtnCTA = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.color || "#fff"};
`;

export const MiniBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${props => props.active ? "#C43A57" : "#fff"};
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px 15px;
`;

export const TxtMiniBtn = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${props => props.active ? "#fff" : "#C43A57"};
`;
export const BtnCTA2 = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 15px;
  border-color: ${props => props.borderColor || "#C43A57"};
  background-color: ${props => props.bgColor || "#C43A57"};
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 30px;
`;

export const TxtBtnCTA2 = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.color || "#fff"};
`;

export const BtnCTA3 = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${props => props.bgColor || "#C43A57"};
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
`;

export const TxtBtnCTA3 = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.color || "#fff"};
`;

export const BtnOption = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${props => props.bgColor || "#5FB480"};
  margin-top: 10px;
  margin-bottom: 10px;
  width: ${props => props.width || "80%"};
  padding: 15px;
`;

export const TxtBtnOption = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.color || "#fff"};
`;

export const BtnSub = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${props => props.bgColor || "#fff"};
  margin-top: 10px;
  margin-bottom: 10px;
  width: ${props => props.width || "80%"};
  padding: 15px;
`;

export const TxtBtnSub = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.color || "#C43A57"};
`;

export const BtnFilter = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${props => props.bgColor || "#5FB480"};
  padding: 10px 20px;
  margin: 0px 5px;
`;

export const TxtBtnFilter = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.color || "#C43A57"};
`;

export const BtnNumber = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${props => props.bgColor || "#C43A57"};
  padding: 8px;
  margin: 0px 5px;
`;

export const TxtBtnNumber = styled.Text`
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.color || "#C43A57"};
`;

export const ScreenTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #C43A57;
  flex: 1;
`;

export const SectionContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

export const ScreenDescription = styled.Text`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
  width: 80%;
`;

export const SectionHeader = styled.View`
  align-items: center;
  justify-content: space-between;
  width: 90%;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: 400;
  color: #C43A57;
  /* width: 80%; */
  text-align: left;
  flex: 1;
`;

export const SectionTitleTwo = styled.Text`
  font-size: 22px;
  font-weight: 400;
  color: #C43A57;
  width: 90%;
  text-align: left;
`;


export const TextAlert = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #C43A57;
  width: 90%;
  text-align: center;
  margin: 5px 0px;
`;

export const SectionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SectionButtonTitle = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #108AB2;
`;

export const SubjectItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SubjectTitle = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color:  ${props => props.color || "#555"};
`;

export const TrashIcon = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px;
  background-color: red;
`;

export const BtnSelect = styled.TouchableOpacity`

  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-color: #fff;
  background-color: ${props => props.selected ? "#2A4F90" : "#999"};
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  margin: 5px;

`;

export const TxtBtnSelect = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const BtnSeeMore = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-color: #fff;
  background-color: #5FB480;
  padding: 10px;

`;

export const TxtBtnSeeMore = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const SelectionRow = styled.View`

  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;

`;

export const SelectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: #2A4F90;
  width: 90%;
`;

export const Container = styled.View`
  flex:1;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  /* background-color: #efefef; */
  padding-top: 30px;
`;

export const MapContainer = styled.View`
  flex: 2;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: #fff;
`;

export const ContainerKeyboard = styled.KeyboardAvoidingView`
  flex:1;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  padding-top: 0;
`;

export const Scroll = styled.View`
  flex: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  width: 100%;
  padding: 10px 0px;
  background-color: #fff;
`;

export const ScrollContainer = styled.ScrollView.attrs(props => ({
  contentContainerStyle: { alignItems: 'center', justifyContent: "flex-start" },
  showsVerticalScrollIndicator: false,
}))`
  /* border-top-left-radius: 50px; */
  /* border-top-right-radius: 50px; */
  width: 100%;
`;

export const ScrollHorizontal = styled.ScrollView.attrs(props => ({
  // contentContainerStyle: { alignItems: 'flex-start', justifyContent: "flex-start" },
  showsHorizontalScrollIndicator: false,
  horizontal: true
}))`
  margin: 10px 0px;
  width: 100%;
`;

export const ClassesScrollHorizontal = styled.ScrollView.attrs(props => ({
  // contentContainerStyle: { alignItems: 'center', justifyContent: "flex-start", backgroundColor: "green" },
  showsHorizontalScrollIndicator: false,
  horizontal: true
}))`
  margin: 5px 0px;
  width: 100%;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background-color: #efefef; */
  margin: 40px 0px 15px 0px;
  padding: 5px 0px;
  width: 90%;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-end;
  justify-content: space-around;
  /* padding: 10px 0px 15px 0px; */
  padding: 10px 0px 15px 0px;
  width: 100%;
  background-color: #fff;
`;

export const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  /* width: 100%; */
`;

export const Column = styled.View`
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

export const AdContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  width: 90%;
`;

export const AdTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #111;
  margin: 5px 0px;
  width: 90%;
`;

export const AdPrice = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: #555;
`;

export const AdPriceContainer = styled.View`
  margin: 3px 0px;
  padding: 5px;
  background-color: #efefef;
  border-radius: 50px;
`;

export const AdAdvertiser = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #01626B;
`;
export const AdImg = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
export const Logo = styled.Image`
  width: ${props => 608 * 0.3 + "px"};
  height: ${props => 165 * 0.3 + "px"};
`;
export const ProfileImage = styled.Image`
  width: ${props => 200 * 0.3 + "px"};
  height: ${props => 200 * 0.3 + "px"};
`;
export const ProfileImage2 = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
export const Illustration = styled.Image`
  width: ${props => 1125 * 0.3 + "px"};
  height: ${props => 1082 * 0.3 + "px"};
`;

export const BtnQuick = styled.TouchableOpacity`

`;

export const BtnQuickTxt = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 3px 5px;
`;

//modal

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalView = styled.View.attrs(props => ({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  borderTopWidth: 2,
  borderLeftWidth: 2,
  borderRightWidth: 2,
}))`

  /* margin: 20; */
  background-color: #fff;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  width: 100%;
  position: absolute; 
  bottom: 0; 
  margin: 0; 
  border: 2px solid #fff;
  /* elevation: 0; */
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #555;
`;
export const ModalDescription = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 10px 0px;
`;
export const BtnModal = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bgColor || "#5FB480"};
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 50px;
`;
export const TxtBtnModal = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.color || "#C43A57"};
`;

//inputs

export const TxtInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: "#E46788"
}))`
  width: 90%;
  height: 50px;
  padding: 0px 0px;
  margin: 5px 0px;
  font-size: 16px;
  border-bottom-width: 1px;
  border-color: #C43A57;
`;

export const CheckoutInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: "#E46788"
}))`
  width: 90%;
  height: 40px;
  padding: 0px 0px;
  margin: 5px 0px;
  font-size: 16px;
  border-bottom-width: 1px;
  border-color: #C43A57;
`;

export const CheckoutInputTwo = styled.TextInput.attrs(props => ({
  placeholderTextColor: "#E46788"
}))`
  flex:1;
  height: 40px;
  padding: 0px 0px;
  margin: 5px 0px;
  font-size: 16px;
  border-bottom-width: 1px;
  border-color: #C43A57;
`;

export const TxtInput1 = styled.TextInput.attrs(props => ({
  placeholderTextColor: "#E46788"
}))`
  /* width: 80%; */
  flex:1;
  height: 50px;
  padding: 0px 0px;
  margin: -10px 10px 0px 10px;
  font-size: 16px;
  border-bottom-width: 1px;
  border-color: #C43A57;
`;

export const BtnBack = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #155057;
  margin: 5px 20px;
  padding: 10px 20px;
  border-radius: 50px;
`;
export const TxtBtnBack = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: #fff;
`;

export const ClassBox = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  border: 1px solid #aeaeae;  
  border-radius: 50px;
  margin: 0px 3px;
  padding: 3px;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
`;

export const ClassBoxCircleContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #C43A57;
  width: 56px;
  height: 56px;
  border-radius: 50px;
  padding: 0;
`;

export const ClassBoxCircleDay = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  margin-bottom: -10px;
`;
export const ClassBoxCircleMonth = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #fff;
`;

export const ExerciseBoxContainer = styled.TouchableOpacity`
  margin: 10px 20px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: #e2e5e9;
  width: 162px;
  border-radius: 10px;
  /* height: 108px; */
`;

export const ExerciseBoxTitle = styled.Text`
  font-size: 12px;
  font-weight: 900;
  color: #C43A57;
`;

export const ExerciseBoxTeacher = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #555;
`;

export const ExerciseBoxDesc = styled.Text`
  font-size: 10px;
  font-weight: 300;
  color: #999;
`;

export const ExerciseIcon = styled.View`
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  background-color: #01e0f2;
  border-radius: 20px;
`;

export const ExerciseIcon2 = styled.View`
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
  background-color: #01e0f2;
  border-radius: 20px;
`;

export const ClassBoxContainer = styled.TouchableOpacity`
  margin: 10px 10px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.selected ? "#5227a0" : "#e2e5e9"};
  width: 90%;
  border-radius: 10px;
  /* height: 108px; */
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const ClassBoxTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.selected ? "#e2e5e9" : "#5227a0"};
  flex: 1;
  margin-left: 10px;
`;

export const ClassListContainer = styled.View`
  margin: 0;
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  flex-direction: column;
`;
export const ClassListItemContainer = styled.TouchableOpacity`
  margin: 5px 0px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? "#C96786" : "#FFEBF1"};
  width: 100%;
  border-radius: 10px;
  flex-direction: row;
  flex-wrap: nowrap;

`;

export const ClassListItemTitle = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.active ? "#FFEBF1" : "#C96786"};
  flex: 1;
  margin-left: 10px;
`;

export const ClassListItemDescription = styled.Text`
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.active ? "#FFEBF1" : "#C96786"};
  flex: 1;
  margin-left: 10px;
`;


export const MiniBox = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  flex: 2;
`;

export const RankingBoxContainer = styled.TouchableOpacity`
  margin: 10px 0px;
  padding: 10px;
  align-items: center;
  justify-content: flex-start;
  background-color: #5227a0;
  width: 90%;
  border-radius: 10px;
`;

export const RankingBoxItem = styled.TouchableOpacity`
  margin: 10px 0px;
  padding: 5px 0px;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  flex-direction: row;
  flex-wrap: nowrap;
  border-bottom-width: 1px;
  border-bottom-color: #aaa;
`;

export const RankingBoxPosition = styled.Text`
  font-size: 16px;
  font-weight: 900;
  color: #ccc;
  margin: 0px 10px;
`;

export const RankingBoxTitle = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-left: 10px;
`;

export const ChapterTitle = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  /* margin-left: 10px; */
`;



export const TxtWelcome = styled.Text`
  font-size: 22px;
  font-weight: 300;
  color: #C43A57;
  text-align: center;
  width: 100%;
`;

export const TxtQuestion = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #C43A57;
  text-align: center;
  width: 100%;
`;

export const BoxTitle = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  width: 90%;
  align-items: center;
  justify-content: center;
`;

export const TxtSecondaryTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #C43A57;
  text-align: center;
`;

export const TxtNewsTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  background-color: #C43A57;
  color: #efefef;
  text-align: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 7px;
  padding-bottom: 7px;
`;



//header component


export const HeaderTxtComp = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: #C43A50;
  text-align: center;
  /* width: 100%; */
`;

export const HeaderComp = styled.TouchableOpacity`
  background-color: #FFEBF1;
  border-radius: 10px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const SearchBar = styled.TextInput`
  margin: 5px 0px;
  padding: 12px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 50px;
  width: 90%;
  color: #555;
  font-weight: bold;
`;

export const List = styled.View`
  padding: 5px;
  width: 90%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ListItem = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 10px;
  width: 45%;
  height: 140px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5px;
  border-width: ${props => props.selected ? '3px' : '1px'};
  border-color: ${props => props.selected ? 'rgb(65, 185, 98)' : '#ddd'};
`;

export const ListPhoto = styled.Image`
  flex: 1;
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const ListTitle = styled.Text`
  color: rgb(185, 65, 98);
  font-weight: 500;
  padding: 8px 5px;
  font-size: 12px;
`;