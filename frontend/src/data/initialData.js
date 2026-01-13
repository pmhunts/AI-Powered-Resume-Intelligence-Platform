// Initial Resume Data Template
export const initialResumeData = {
    personalInfo: {
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/alexmorgan',
        github: 'github.com/alexmorgan',
        location: 'San Francisco, CA'
    },
    summary: 'Results-driven Senior Backend Engineer with 6+ years of experience designing scalable microservices and distributed systems. Expert in Python, FastAPI, and AWS. Proven track record of optimizing API performance by 40% and leading cross-functional teams to deliver high-impact features.',
    experience: [
        {
            id: 1,
            role: "Senior Backend Engineer",
            company: "TechFlow Solutions",
            years: "2021 - Present",
            description: [
                "Architected a high-throughput API gateway handling 1M+ daily requests using FastAPI and Redis.",
                "Reduced infrastructure costs by 25% through optimizing Docker container orchestration on AWS ECS.",
                "Led the migration of a monolithic legacy codebase to a microservices architecture, improving deployment frequency by 3x."
            ]
        },
        {
            id: 2,
            role: "Software Engineer",
            company: "DataStream Corp",
            years: "2018 - 2021",
            description: [
                "Developed RESTful APIs for real-time data processing using Python and Flask.",
                "Implemented automated CI/CD pipelines with Jenkins, reducing build times by 50%.",
                "Collaborated with data scientists to productize machine learning models for fraud detection."
            ]
        }
    ],
    education: [
        {
            id: 1,
            degree: "B.S. Computer Science",
            school: "University of Technology",
            year: "2018"
        }
    ],
    skills: ['Python', 'FastAPI', 'Django', 'AWS (ECS, Lambda, S3)', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'CI/CD', 'System Design']
};

export default initialResumeData;
