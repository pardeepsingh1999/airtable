import { Spinner } from "reactstrap";

interface Props {
  message?: string;
}

const PageLoading = ({ message }: Props) => {
  return (
    <div className="content box-center">
      <h4 className="m-0 me-2">{message || "Loading"}</h4> <Spinner />
    </div>
  );
};

export default PageLoading;
