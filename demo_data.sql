DELETE FROM courses;
DELETE FROM enrollments;
DELETE FROM announcements;
DELETE FROM events;


ALTER SEQUENCE courses_id_seq RESTART WITH 101;

INSERT INTO courses(description, course_name, course_number, instructor_id) VALUES
('This is applied algo description', 'Applied Algorithms', 'CSCI-B505', 2),
('This is software engineering description', 'Software engineering', 'CSCI-B502', 2),
('This is advanced os description', 'Advanced OS', 'CSCI-B501', 2);

INSERT INTO enrollments(student_id, course_id) VALUES
(3, 101),
(3, 102);

INSERT INTO announcements(course_id, title, description) VALUES
(101, 'Exam 2 on Monday!', 'Please be ready'),
(101, 'Assignment 5 released', 'All the best');

INSERT INTO events(event_name, event_type, start_time, end_time, repeating_weekly, course_id) VALUES
('Class', 'CLASS','2023-08-22 09:45:00', '2023-08-22 11:00:00', TRUE, 101),
('Class', 'CLASS','2023-08-24 09:45:00', '2023-08-24 11:00:00', TRUE, 101);