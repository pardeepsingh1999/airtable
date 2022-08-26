import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
import PageLoading from "../components/PageLoading";
import { errorHandler } from "../helpers";
import { getClasses, getStudents } from "../http/http-call";
import { addClasses, addStudents } from "../redux/actions/table-data";

const Home = () => {
  const dispatch = useDispatch();

  const userCredential = useSelector((state: any) => state?.userCredential);
  const tableData = useSelector((state: any) => state?.tableData);

  const [loading, setLoading] = useState(false);

  const _getTableData = async () => {
    try {
      setLoading(true);

      const classParamCondition = userCredential?.fields?.Classes?.map(
        (classId: string) => `RECORD_ID()='${classId}'`
      );

      const classParams = { filterByFormula: `OR(${classParamCondition})` };
      const { records: classess }: any = await getClasses(classParams);
      dispatch(addClasses(classess));

      const studentIds = classess?.reduce((acc: any, each: any) => {
        each.fields.Students.forEach((studentId: any) =>
          !acc.includes(studentId) ? acc.push(studentId) : {}
        );

        return acc;
      }, []);

      const studentParamCondition = studentIds?.map(
        (classId: string) => `RECORD_ID()='${classId}'`
      );
      const studentParam = {
        filterByFormula: `OR(${studentParamCondition})`,
      };
      const { records: students }: any = await getStudents(studentParam);

      const formattedStudents: any = {};

      studentIds.forEach((studentId: any) => {
        const findStudent = students.find((each: any) => each.id === studentId);

        formattedStudents[studentId] = { ...findStudent };
      });

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

  if (loading) return <PageLoading message="Fetching details..." />;

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
          <Card>There is no data to display.</Card>
        )}
      </Container>
    </div>
  );
};

export default Home;
