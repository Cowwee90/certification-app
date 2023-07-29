import { StudentTable } from "../students/student-table.jsx";
import { AddStudentButton } from "../students/show-form.jsx";

const Students = () => {
  return (
    <div className="main-section">
      <AddStudentButton />
      <StudentTable />
    </div>
  );
};

export default Students;
