import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Size } from "../interfaces/Size";
import { getSizes } from "../services/size";

type Props = {
  children: React.ReactNode;
};
export const SizeCT = createContext({} as any);
const SizeContext = ({ children }: Props) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const router = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await getSizes();
      setSizes(data);
    })();
  }, []);

  return (
    <div>
      <SizeCT.Provider value={{ sizes }}>{children}</SizeCT.Provider>
    </div>
  );
};

export default SizeContext;
