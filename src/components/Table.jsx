import React, { useEffect } from "react";
import { useState } from "react";
import "../assets/styles/Table.css";

import { useSelector, useDispatch } from "react-redux";
import { sort, change, add, remove, changeTitle } from "../redux/store";

let id = 0;

function max(a) {
  let r = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id > r) r = a[i].id;
  }

  return r;
}

function Table() {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [Sum, SetSum] = useState(0);
  const [Changing, SetChanging] = useState(0);

  useEffect(() => {
    id = max(data.Data);
    let sum = 0;
    data.Data.forEach((item) => {
      sum += item.price * item.SL;
    });
    SetSum(() => sum);
  }, [data]);

  useEffect(() => {
    if (Changing == 0) {
      dispatch(sort());
    }
  }, [Changing]);

  const AddHandler = () => {
    id += 1;
    dispatch(add({ id }));
    SetChanging(id);
  };

  const ChangeHandler = (action, id, value) => {
    dispatch(
      change({
        type: action,
        id,
        value,
      })
    );
  };

  const DeleteHandler = (id) => {
    dispatch(remove({ id }));
  };

  return (
    <div className="table">
      {Changing == -1 || !data.title ? (
        <input
          value={data.title}
          onChange={(e) =>
            dispatch(
              changeTitle(e.target.value)
            )
          }
          onBlur={() => SetChanging(0)}
        ></input>
      ) : (
        <h3 onClick={() => SetChanging(-1)}>{data.title}</h3>
      )}
      <p>{data.Date}</p>
      <div className="head">
        <div className="th name">Tên</div>
        <div className="th price">Giá (vnđ)</div>
        <div className="th SL">
          SL
          <br />
          (kg <br />
          /cái)
        </div>
        <div className="th ThanhTien">Thành tiền (vnđ)</div>
        <div className="th Control">Điều khiển</div>
      </div>

      <div className="body">
        {data.Data.map((item) =>
          item.id == Changing ? (
            <div className="tr" key={item.id}>
              <div className="td name">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    ChangeHandler("name", item.id, e.target.value)
                  }
                />
              </div>
              <div className="td price">
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) =>
                    ChangeHandler("price", item.id, Number(e.target.value))
                  }
                />
              </div>
              <div className="td SL">
                <input
                  type="text"
                  value={item.SL}
                  onChange={(e) =>
                    ChangeHandler("SL", item.id, Number(e.target.value))
                  }
                />
              </div>
              <div className="td ThanhTien">
                {(item.SL * item.price) / 1000 + "K"}
              </div>
              <div className="td complete">
                <div className="change" onClick={() => SetChanging(0)}>
                  Xong
                </div>
              </div>
            </div>
          ) : (
            <div className="tr" key={item.id}>
              <div className="td name">{item.name}</div>
              <div className="td price">{item.price / 1000 + "K"}</div>
              <div className="td SL">{item.SL}</div>
              <div className="td ThanhTien">
                {(item.SL * item.price) / 1000 + "K"}
              </div>
              <div className="td Change">
                <div className="change" onClick={() => SetChanging(item.id)}>
                  Sửa
                </div>
              </div>
              <div className="td Delete">
                <div className="delete" onClick={() => DeleteHandler(item.id)}>
                  Xóa
                </div>
              </div>
            </div>
          )
        )}

        <div className="tr">
          <div className="td">
            <div className="add" onClick={AddHandler}>
              Thêm
            </div>
          </div>
        </div>
        <div className="tr">
          <div className="td sum">Tổng tiền: {Sum}</div>
        </div>
      </div>
    </div>
  );
}

export default Table;
