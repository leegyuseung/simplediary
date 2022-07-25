import React, { useState, useRef, useEffect } from "react";

// props에는 list에 있는 요소들
const DiaryItem = ({
  onEdit, // 함수
  onRemove, // 함수
  //데이터들
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  useEffect(() => {
    console.log(`${id}번 째 아이템 랜더!`);
  });

  //  수정하기(true가 되면 수정가능한 상태로 바뀐다.)
  const [isEdit, setIsEdit] = useState(false);

  // toggleIsEdit이 실행되면 반전연산
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //textaria input을 핸들링 하기위한 state
  const [localContent, setLocalContent] = useState(content);

  // 수정할 때의 focus
  const localContentInput = useRef();

  // 삭제하기 function
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  // 수정하다 취소했을 때 수정내용 초기화하기.
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  // 수정하기 버튼을 클릭시 실행
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        {/* 시간을 사람이 볼수 있게 바꿔준다. toLocalString() */}
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {/* isEdit이 true이면 수정하기위한 textarea가 나오고 false이면 내용이 그대로 나온다. */}
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {/* isEdit이 true일 때는 버튼의 역할을 다르게 해준다. */}
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
