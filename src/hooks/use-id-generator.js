import { useState } from "react";

export const useIdGenerator = () => {
  const [id, setId] = useState(1);

  const generateId = () => {
    setId((id) => id + 1);
    return id;
  };

  return generateId;
};
