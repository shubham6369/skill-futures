import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'courses'));
                const coursesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCourses(coursesData);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="courses-page">
            <header className="courses-header">
                <h1>Unlock Your Potential</h1>
                <p>Learn from industry experts with our curated masterclasses.</p>
            </header>
            
            <div className="courses-grid">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <div className="course-image">
                                <img src={course.image} alt={course.title} />
                                <div className="course-badge">{course.rating} ★</div>
                            </div>
                            <div className="course-content">
                                <span className="course-instructor">{course.instructor}</span>
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <div className="course-footer">
                                    <span className="course-price">${course.price.toFixed(2)}</span>
                                    <button className="enroll-btn">Enroll Now</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-courses">
                        <p>No courses available at the moment. Please check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
