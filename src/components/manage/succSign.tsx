"use client";

import { ChangeEvent, useEffect, useState } from "react";

interface DataTest {
  title: string;
  status: string;
  createdAt: string;
}

const mockData: DataTest[] = [
  {
    title: "new",
    status: "active",
    createdAt: "12 Jan",
  },
  {
    title: "new",
    status: "completed",
    createdAt: "12 Jan",
  },
  {
    title: "new",
    status: "active",
    createdAt: "12 Jan",
  },
  {
    title: "new",
    status: "active",
    createdAt: "12 Jan",
  },
  {
    title: "new",
    status: "completed",
    createdAt: "12 Jan",
  },
];

export default function SuccSign(props: { status: any }): JSX.Element {
  const [checkboxState, setCheckboxState] = useState<string[]>(
    mockData.map((item) => item.status)
  );

  const handleOnCheckBox = (index: number) => {
    setCheckboxState((prevState) =>
      prevState.map((state, i) =>
        i === index ? (state === "active" ? "completed" : "active") : state
      )
    );
  };

  return (
    <div className="">
      {mockData.length > 0 ? (
        <div className="">
          {mockData.map((item: DataTest, index: number) => (
            <div key={index} className="bg-white p-5 my-5 rounded-lg">
              <div className="flex flex-row items-center gap-[0.8em]">
                <div className="flex flex-col">
                  <input
                    type="checkbox"
                    name="status"
                    checked={checkboxState[index] === "completed"}
                    onChange={() => handleOnCheckBox(index)}
                    className=""
                  />
                  <input type="checkbox" className="invisible h-4" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[1em] font-[600]">{item.title}</p>
                  <p className="text-gray-500 text-[0.85em] font-[400]">
                    Created at {item.createdAt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full border border-gray-300 bg-[#F4F4F5] rounded-lg p-10 gap-[1em]">
          <div className="">
            <img src="images/copy-plus.png" alt="lock" className="w-[5em]" />
          </div>
          <div className="flex flex-col justify-center items-center gap-[0.5em]">
            <p className="text-[1em] text-black">Oops, nothing here!</p>
            <p className="text-[0.85em] text-gray-500">
              No tasks found! Time to create something new?
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
