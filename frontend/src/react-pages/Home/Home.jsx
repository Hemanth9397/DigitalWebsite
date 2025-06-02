import { Button } from 'antd';
import React from 'react'
import useTitle from '../../hooks/useTitle';

 const Home = () => {

useTitle("Home");
  return (
    <div className="bg-blue-500 text-white p-4">
      <h1 className="text-4xl">Home</h1>
      <Button type="primary" onClick={() => (window.location.href = "/about")}>
        About
      </Button>
    </div>
  );
}

export default Home;
