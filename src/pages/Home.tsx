import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
import PageLoading from "../components/PageLoading";
import { errorHandler } from "../helpers";
import { getClasses, getStudents } from "../http/http-call";
import { addClasses, addStudents } from "../redux/actions/table-data";

const Home = () => {
  const dispatch = useDispatch();

  // get logged-in user data from redux store
  const userCredential = useSelector((state: any) => state?.userCredential);
  // get table data from redux store
  const tableData = useSelector((state: any) => state?.tableData);

  const [loading, setLoading] = useState(false);

  const _getTableData = async () => {
    try {
      setLoading(true);

      // prepare condition to get particular class details
      const classParamCondition = userCredential?.fields?.Classes?.map(
        (classId: string) => `RECORD_ID()='${classId}'`
      );

      // class query params
      const classParams = { filterByFormula: `OR(${classParamCondition})` };

      // hit api call to get class details
      const { records: classess }: any = await getClasses(classParams);

      // dispatch/add classes details in redux store
      dispatch(addClasses(classess));

      // filter unique student ids array
      const studentIds = classess?.reduce((acc: any, each: any) => {
        each.fields.Students.forEach((studentId: any) =>
          !acc.includes(studentId) ? acc.push(studentId) : {}
        );

        return acc;
      }, []);

      // prepare condition to get particular student details
      const studentParamCondition = studentIds?.map(
        (classId: string) => `RECORD_ID()='${classId}'`
      );

      // student query params
      const studentParam = {
        filterByFormula: `OR(${studentParamCondition})`,
      };

      // hit api call to get student details
      const { records: students }: any = await getStudents(studentParam);

      // prepare format for student object to add data to redux
      const formattedStudents: any = {};

      // format students data like ( [studentId] = { student details } )
      studentIds.forEach((studentId: any) => {
        const findStudent = students.find((each: any) => each.id === studentId);

        formattedStudents[studentId] = { ...findStudent };
      });

      // dispatch/add students details in redux store
      dispatch(addStudents(formattedStudents));

      setLoading(false);
    } catch (error: any) {
      errorHandler(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    _getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !tableData?.classes?.length)
    return <PageLoading message="Fetching details..." />;

  return (
    <div className="content box-center">
      <Container>
        {tableData?.classes?.length ? (
          tableData.classes.map((each: any) => (
            <Card className="my-2" key={each.id}>
              <CardBody>
                <CardTitle tag="h6">Name</CardTitle>
                <CardText>{each.fields.Name}</CardText>

                <CardTitle tag="h6">Students</CardTitle>
                <CardText>
                  {each.fields.Students.map(
                    (studentId: string, index: number) => (
                      <span key={studentId}>
                        {tableData?.students[studentId]?.fields?.Name}
                        {index !== each.fields?.Students?.length - 1
                          ? ", "
                          : ""}
                      </span>
                    )
                  )}
                </CardText>
              </CardBody>
            </Card>
          ))
        ) : (
          <Card>
            <CardBody>There is no data to display.</CardBody>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default Home;
