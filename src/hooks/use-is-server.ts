import { useEffect, useState } from "react";

export const useIsServer = () => {
  const [isServer, setIsServer] = useState(false);
  useEffect(() => setIsServer(true), []);
  return isServer;
};
