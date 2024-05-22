import { ControllersProvider } from "./Contexto";
import VistaPrivadaLayout from "./VistaPrivadaLayout";

const VistaPrivada = () => {
  return (
    <>
      <ControllersProvider>
        <VistaPrivadaLayout></VistaPrivadaLayout>
      </ControllersProvider>
    </>
  );
};

export default VistaPrivada;
