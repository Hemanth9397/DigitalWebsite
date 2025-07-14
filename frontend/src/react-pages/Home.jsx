import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

 const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-500 text-white p-4">
      <h1 className="text-4xl">Home</h1>
      <Button type="primary" onClick={() => navigate("/about")}>
        About
      </Button>
    </div>
  );
}

export default Home;
