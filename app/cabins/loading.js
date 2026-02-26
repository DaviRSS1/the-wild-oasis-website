import Spinner from "../_components/Spinner";

function loading() {
  return (
    <div className="grid items-center justify-center">
      <p className="text-xl text-primary-200">Loadig cabin data...</p>
      <Spinner />
    </div>
  );
}

export default loading;
