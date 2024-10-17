import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Size } from "../interfaces/Size";
import { getSizes } from "../services/size";
import { Color } from "../interfaces/Color";
import { getColors } from "../services/color";

type Props = {
  children: React.ReactNode;
};
export const ColorCT = createContext({} as any);
const ColorContext = ({ children }: Props) => {
  const [colors, setColors] = useState<Color[]>([]);
  const router = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await getColors();
      setColors(data);
    })();
  }, []);

  return (
    <div>
      <ColorCT.Provider value={{ colors }}>{children}</ColorCT.Provider>
    </div>
  );
};

export default ColorContext;
