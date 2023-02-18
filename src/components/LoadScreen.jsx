import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSaved, load } from "../redux/store";

import "../assets/styles/LoadScreen.css";

function LoadScreen() {
  const saved = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  function DeleteHandler(id) {
    dispatch(removeSaved(saved.data.filter((item) => item.id != id)));
  }

  function LoadHandler(id) {
    dispatch(load(saved.data.find((item) => item.id == id)));
  }
  return (
    <div>
      {saved.data.length == 0 ? (
        <h3>Chưa lưu hóa đơn nào</h3>
      ) : (
        saved.data.map((item, index) => (
          <div className="item" key={index}>
            <h4>{item.title}</h4>
            <p>{item.Date}</p>
            <div className="delete-saved" onClick={() => DeleteHandler(item.id)}>
              Xóa
            </div>
            <div className="load-saved" onClick={() => LoadHandler(item.id)}>
              Tải
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default LoadScreen;
