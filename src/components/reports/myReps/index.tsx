import React, { useEffect, useState } from "react";
import * as css from "./index.css";
import { NoReps } from "../NoReps";
import { getUserReps } from "../../../hooks";
import { useNavigate } from "react-router-dom";
export function MyReps() {
  const nav = useNavigate();

  const [data, setData] = useState([]);
  console.log(data);
  const userRepsRes = getUserReps();
  useEffect(() => {
    setData(userRepsRes);
  }, [userRepsRes]);

  function MyRepsComp(data) {
    console.log(data);
    return (
      <>
        {" "}
        {data.repsData.data.map((d) => (
          <div key={d.id} id={d.id} className={css.reportContainer}>
            <div className={css.reportImg}>
              <img className={css.reportProfileImg} src={d.petImg} />
            </div>
            <div className={css.reportBox}>
              <div className={css.reportInfo}>
                <h2 className={css.reportTitle}>{d.petName}</h2>
                <h4 className={css.reportLocation}>{d.location}</h4>
              </div>
              <button
                type="button"
                className={css.reportButtonEdit}
                onClick={() => nav("/edit-report/" + d.id, { replace: true })}
              >
                Edit
                <img src="/imgs/pencil.png" />
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
  function MainComp(data) {
    return data.data.length > 0 ? (
      <div className={css.main}>
        <h2 className={css.title}>Reported Pets</h2>
        <MyRepsComp repsData={data} />
      </div>
    ) : (
      <NoReps />
    );
  }
  return <MainComp data={data} />;
}
