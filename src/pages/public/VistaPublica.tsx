import { ControllersProvider } from "./Contexto";
import VistaPublicaLayout from "./VistaPublicaLayout";

const VistaPublica = () => {
  return (
    <>
      <ControllersProvider>
        <VistaPublicaLayout></VistaPublicaLayout>
      </ControllersProvider>
    </>
  );
};

export default VistaPublica;
