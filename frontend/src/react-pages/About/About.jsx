import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Skeleton } from "antd";

const About = () => {
  const [{ isLoading, data }, setData] = useState({
    isLoading: false,
    data: [],
  });

  useEffect(() => {
    (async () => {
      try {
        setData((prevState) => ({ ...prevState, isLoading: true }));

        const response = await axios.get("http://localhost:5000/about");
        setData((prevState) => ({
          ...prevState,
          isLoading: false,
          data: response?.data
        }));
      } catch (e) {
        setData((prevState) => ({ ...prevState, isLoading: false }));
      }
    })();
  }, []);

  console.log("data :",data);
  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
          <Skeleton />
        </div>
      ) : (
        !_.isEmpty(data) && data?.map((d, i) => {
          return (
            <div
              key={i}
              className="min-h-screen flex items-center justify-center bg-gray-100 text-black"
            >
              <div className="p-6 rounded-xl shadow-xl bg-white">
                <h1 className="text-4xl font-bold text-blue-600">{d?.title}</h1>
                <p className="mt-2 text-gray-600">{d?.content}</p>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default About;
