import React from "react";
import ShowModel from "../components/ShowModel";


function ViewFurniture() {
  return (
    <section className="h-screen">
      <div className="flex w-auto h-3/6">
        <ShowModel path="./src/assets/models/1.glb" />
      </div>
    </section>
  );
}

export default ViewFurniture;
