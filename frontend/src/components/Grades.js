import './Grades.css'

function Grades(){

    const grades = [
        {
            title: 'Assignment 1',
            graded_result : 'B'

        },
        {
            course_id : 1,
            title: 'Assignment 2',
            graded_result : 'A'

        },

        {
            course_id : 1,
            title: 'Assignment 1',
            graded_result : 'F'

        }
    ]

    return (
        <div>
            <h1>Student Grades</h1>
            <table border="1">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Graded Result</th>
                </tr>
                </thead>
                <tbody>
                {grades.map((grade, index) => (
                    <tr key={index}>
                    <td>{grade.title}</td>
                    <td>{grade.graded_result}</td>
                    </tr>
                ))}
                </tbody>
            </table>
 
        </div>
    )


} 
export default Grades;
