import moment from "moment";

import { DataTodo } from "@/@entity/TodoList";
import styles from "../todos.module.css";

export default function SuccSign(props: {
  data: DataTodo[];
  setData: (id: number, status: string) => void;
}): JSX.Element {

  const handleOnCheckBox = (id?: number) => {
    if (id) {
      const updatedTodo = props.data.find((todo) => todo.id === id);
      if (updatedTodo) {
        const newStatus =
          updatedTodo.status === "active" ? "completed" : "active";
        props.setData(id, newStatus);
      }
    }
  };

  return (
    <div className="">
      {props.data.length > 0 ? (
        <div className="">
          {props.data.map((item: DataTodo, index: number) => (
            <div key={index} className="bg-white p-5 my-5 rounded-lg">
              <div className="flex flex-row items-center gap-[0.8em]">
                <div className="mt-[-2.8em]">
                  <label className={styles.customCheckbox}>
                    <input
                      type="checkbox"
                      name="status"
                      checked={item.status === "completed"}
                      onChange={() => handleOnCheckBox(item.id)}
                      className={`${styles.checkmark} cursor-pointer`}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                </div>
                <div className="flex flex-col">
                  <p className="text-[1em] font-[600]">{item.title}</p>
                  <p className="text-gray-500 text-[0.85em] font-[400]">
                    Created at {moment(item.createdAt).format("ll")}
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
