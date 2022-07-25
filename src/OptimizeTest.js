import React, { useEffect, useState } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Counter A update - count:${count}`);
  });
  return <div>{count}</div>;
});
// 객체는 주소에 의한 얕은비교를한다. 정상작동. 리랜더링됌.
// const CounterB = React.memo(({ obj }) => {
//   useEffect(() => {
//     console.log(`Counter B update - obj:${obj.count}`);
//   });
//   return <div>{obj.count}</div>;
// });

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`Counter B update - obj:${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }

  return false;
  //return true // 이전 프롭스와 현재 프롭스가 같다. => 리렌더링을 일으키지 않게 된다.
  //return false // 이전과 현재가 다르다. => 리렌더링을 일으킨다.
};

const MemorizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({ count: 1 });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemorizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};

export default OptimizeTest;
