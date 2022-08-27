import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import PageLoading from "../components/PageLoading";
import { errorHandler, showToast } from "../helpers";
import { getStudents } from "../http/http-call";
import { addUserCredential } from "../redux/actions/user-credential";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const _onLogin = async (e: any) => {
    try {
      if (e) e.preventDefault();

      if (!name?.trim()) {
        showToast("Name is required", "error");
        return;
      }

      setLoading(true);

      // student query params - get student by name
      const userDataParams = {
        filterByFormula: `{Name}='${name}'`,
      };

      // hit api call to get student details
      const { records: userData }: any = await getStudents(userDataParams);

      // if userData found by name in airTable api
      if (userData.length && userData[0]) {
        // dispatch/add student details in redux store
        dispatch(
          addUserCredential({
            studentId: userData[0].id,
            fields: { ...userData[0].fields },
          })
        );
        // redirect to home page
        navigate("/home");
      } else {
        errorHandler({ reason: "User not found" });
      }

      setLoading(false);
    } catch (error: any) {
      errorHandler(error);
      setLoading(false);
    }
  };

  if (loading) return <PageLoading message="Login..." />;

  return (
    <div className="content box-center">
      <Container>
        <Form onSubmit={(e) => _onLogin(e)}>
          <FormGroup>
            <Label>Student Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
