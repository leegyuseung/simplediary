import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length} 개의 일기가 있습니다. </h4>
      <div>
        {diaryList.map((it) => (
          // List를 DiaryItem에 넣어준다. key=id로 지정해준 것 {...it}는 List 항목을 전부 넣어준 것.
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

// 기본값 설정한다.
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
