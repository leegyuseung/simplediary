import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    return () => {
      //Unmount 시점에 실행되게 됨
      console.log("unmount!");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsvisible] = useState(false);
  const toggle = () => setIsvisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON / OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
