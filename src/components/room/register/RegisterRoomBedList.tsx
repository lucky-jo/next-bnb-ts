import React from "react";
import { useSelector } from "../../../../store";

import RegisterRoomBedTypes from "./RegisterRoomBedTypes";
import RegisterRoomPublicBedTypes from "./RegisterRoomPublicBedTypes";
import { BedType } from "../../../../types/room";

const RegisterRoomBedList: React.FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);

  return (
    <ul className="register-room-bed-type-list-wrapper">
      {bedList.map(
        (bedroom: { id: number; beds: { type: BedType; count: number }[] }) => (
          <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
        )
      )}
      <RegisterRoomPublicBedTypes />
    </ul>
  );
};

export default RegisterRoomBedList;
