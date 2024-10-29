import React, { useState, useEffect } from "react";
import { request } from "../../config/request";
import MessageCard from "./component/message-card";
import { useForm } from "react-hook-form";

const Message = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    request
      .get("/messages")
      .then((res) => {
        console.log("Fetched messages:", res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  const submit = (data) => {
    if (data.name.length > 0) {
      request
        .post("/messages", data)
        .then((res) => {
          setData((prevData) => [...prevData, res.data]);
        })
        .catch((error) => {
          console.log("Error posting message:", error.response.data);
        });
    }
  };

  const deleteMessage = (id) => {
    request
      .delete(`/messages/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((message) => message.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting message:", error.response.data);
      });
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[900px] bg-[url('./assets/bg.jpg')] h-[100vh] ">
      <ul className="flex flex-col gap-[40px] p-[20px]">
        {data?.map((item) => (
          <li
            key={item.id}
            className="w-[400px] rounded-[10px] bg-emerald-500 p-[10px]"
          >
            <MessageCard
              message={item.name}
              className="text-white text-[20px] font-medium"
            />
            <button
              onClick={() => deleteMessage(item.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form
        className="w-[600px] absolute bottom-0 left-[50%] translate-x-[-50%] rounded-[20px] flex gap-[10px] items-center"
        onSubmit={handleSubmit(submit)}
      >
        <input
          className="mb-[10px] border-[2px] rounded-[5px] p-[10px] w-full outline-none block"
          type="text"
          placeholder="name"
          {...register("name")}
        />
        <button
          type="submit"
          className="border-[2px] rounded-[15px] p-[10px] w-[100px] border-sky-500 block"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Message;
