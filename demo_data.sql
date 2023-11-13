DELETE FROM events;
DELETE FROM enrollments;
DELETE FROM announcements;
DELETE FROM courses;
DELETE FROM room_enrollment;
DELETE FROM chat_messages;
DELETE FROM chat_rooms;


ALTER SEQUENCE courses_id_seq RESTART WITH 101;

INSERT INTO courses (course_name, description, course_number, instructor_id) VALUES
('Introduction to Programming', 'This course introduces fundamental programming concepts using Python and Java.', 'CS101', 2),
('Database Management', 'Learn how to design and manage relational databases for efficient data storage.', 'CS202', 2),
('Web Development Fundamentals', 'Explore the basics of web development, including HTML, CSS, and JavaScript.', 'IT101', 2),
('Data Structures and Algorithms', 'An advanced course on data structures and algorithms for solving complex problems.', 'CS303', 2),
('Digital Marketing Essentials', 'Get a comprehensive overview of digital marketing strategies and techniques.', 'MKT101', 2),
('Art History', 'Discover the history of art from ancient civilizations to contemporary art movements.', 'AH201', 2),
('Statistics and Probability', 'Study statistical analysis and probability theory for data-driven decision-making.', 'MATH202', 2),
('Ethical Hacking', 'Learn ethical hacking and cybersecurity, focusing on penetration testing and network security.', 'IT303', 2),
('Environmental Science', 'Explore the impact of human activities on the environment and conservation of natural resources.', 'ENVS101', 2),
('Entrepreneurship', 'Gain knowledge of entrepreneurship, business planning, and startup strategies.', 'BUS101', 2),
('Machine Learning Fundamentals', 'Introduction to machine learning and its applications in various fields.', 'CS404', 2),
('Advanced Web Development', 'Build advanced web applications with a focus on front-end and back-end technologies.', 'IT404', 2),
('Digital Art and Design', 'Learn digital art creation and design using tools like Photoshop and Illustrator.', 'ART303', 2),
('Finance and Investment Strategies', 'Understand financial markets, investment strategies, and portfolio management.', 'FIN301', 2),
('Human Resources Management', 'Explore HR practices, employee management, and workforce development.', 'HRM202', 2),
('Robotics and Automation', 'Study robotics, automation, and their role in modern industries.', 'ENG303', 2),
('International Relations', 'Examine global politics, diplomacy, and international conflict resolution.', 'POL202', 2),
('Business Ethics', 'Discuss ethical issues in business and corporate social responsibility.', 'BUS303', 2),
('Healthcare Management', 'Learn about healthcare administration, healthcare policies, and hospital management.', 'HCM101', 2),
('Culinary Arts', 'Master the art of cooking and culinary techniques in various cuisines.', 'CUL101', 2),
('Psychology of Human Behavior', 'Explore the science of psychology and human behavior.', 'PSY101', 2),
('Mobile App Development', 'Develop mobile apps for iOS and Android platforms using industry-standard tools.', 'IT202', 2),
('Astronomy and Astrophysics', 'Delve into the mysteries of the universe and the study of stars, galaxies, and space.', 'ASTRO101', 2),
('Digital Photography', 'Master the art of digital photography and image editing techniques.', 'ART202', 2),
('Business Law', 'Learn about legal principles and regulations affecting businesses.', 'LAW101', 2),
('Sociology of Culture', 'Study the impact of culture on society and human interactions.', 'SOC101', 2),
('Microeconomics', 'Explore the principles of microeconomics and how they apply to individual and market behaviors.', 'ECON201', 2),
('Organic Chemistry', 'Delve into the world of organic compounds, their properties, and reactions.', 'CHEM202', 2),
('Literary Analysis', 'Analyze and interpret literature from various genres and time periods.', 'ENG202', 2),
('Political Science', 'Study the political systems, governments, and policies of different countries.', 'POL101', 2),
('Music Theory and Composition', 'Learn music theory and composition techniques for creating original music.', 'MUS101', 2),
('World History', 'Explore the history of civilizations from ancient times to the present day.', 'HIST101', 2),
('Environmental Ethics', 'Discuss ethical issues related to the environment and human impact on nature.', 'PHIL202', 2),
('Public Speaking', 'Improve your communication and presentation skills through effective public speaking.', 'COMM101', 2),
('Astrobiology', 'Examine the search for life beyond Earth and the possibility of extraterrestrial life.', 'ASTRO303', 2),
('Marketing Management', 'Learn marketing strategies, consumer behavior, and brand management.', 'MKT303', 2),
('Advanced Programming in C++', 'Enhance your C++ programming skills with advanced topics and techniques.', 'CS505', 2),
('Environmental Law', 'Explore legal issues related to environmental protection and conservation.', 'LAW303', 2),
('Biomedical Engineering', 'Study the intersection of engineering and medicine to develop healthcare solutions.', 'BIOE101', 2),
('Ancient Philosophy', 'Examine the philosophical ideas and writings of ancient thinkers.', 'PHIL101', 2),
('Film Production and Editing', 'Learn the art of filmmaking, including shooting, editing, and post-production.', 'FILM101', 2),
('Quantum Mechanics', 'Delve into the world of quantum physics and its applications in the microscopic realm.', 'PHYS404', 2),
('Artificial Intelligence', 'Explore the theory and applications of artificial intelligence and machine learning.', 'CS606', 2),
('Contemporary Literature', 'Analyze and discuss contemporary literature from various cultural perspectives.', 'ENG404', 2),
('Criminal Justice and Criminology', 'Study the criminal justice system, crime prevention, and criminological theories.', 'CJ101', 2);


INSERT INTO enrollments(student_id, course_id) VALUES
(3, 101),
(3, 103),
(3, 105),
(3, 110),
(3, 115),
(3, 120);

INSERT INTO announcements(course_id, title, description) VALUES
(101, 'Exam 2 on Monday!', 'Please be ready'),
(101, 'Assignment 5 released', 'All the best');

INSERT INTO events(event_name, event_type, start_time, end_time, repeating_weekly, course_id) VALUES
('Class', 'CLASS','2023-08-22 09:45:00', '2023-08-22 11:00:00', TRUE, 101),
('Class', 'CLASS','2023-08-24 09:45:00', '2023-08-24 11:00:00', TRUE, 101);


-- When a course is created new chat room for that course is created
ALTER SEQUENCE chat_rooms_id_seq RESTART WITH 1;

INSERT INTO chat_rooms(room_type, room_name) VALUES
('COURSE', 'Introduction to Programming'),
('COURSE', 'Web Development Fundamentals'),
('COURSE', 'Digital Marketing Essentials');

-- When student is enrolled into a course he is added to course chat room
INSERT INTO room_enrollment(user_id, room_id) VALUES
(2, 1),
(3, 1),
(4, 1),
(2, 2),
(3, 2),
(4, 2),
(2, 3),
(3, 3),
(4, 3);

INSERT INTO chat_messages(sender_id, room_id, content, sent_time) VALUES
(1, 1, 'Welcome', timezone('utc', now())),
(1, 2, 'Welcome', timezone('utc', now())),
(1, 3, 'Welcome', timezone('utc', now()));


