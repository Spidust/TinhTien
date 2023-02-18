import React from "react";
import "../assets/styles/Controller.css";

import { save } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Get } from "../helper/Storage.js";
import { useState } from "react";
import LoadScreen from "./LoadScreen";

function Controller() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [Load, SetLoad] = useState(false);

  function saveHandler() {
    let adding = true;
    const Data = Get();
    let newData = Data;
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].id == data.id) {
        newData[i] = data;
        adding = false;
      }
    }

    if (adding) {
      newData = [...newData, data];
    }

    dispatch(save(newData));
  }
  return (
    <>
      {Load ? <LoadScreen></LoadScreen> : null}
      <div className="controller">
        <div className="save button" onClick={saveHandler}>
          Lưu
        </div>
        <div className="load button" onClick={() => SetLoad(!Load)}>
          Tải
        </div>
      </div>
    </>
  );
}

export default Controller;
