import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Team.css';

const Team = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'team'));
                const teamData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTeam(teamData);
            } catch (error) {
                console.error("Error fetching team:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="team-page">
            <header className="team-header">
                <h1>Our Expert Instructors</h1>
                <p>Meet the visionaries dedicated to your growth and success.</p>
            </header>
            
            <div className="team-grid">
                {team.length > 0 ? (
                    team.map((member) => (
                        <div key={member.id} className="team-card">
                            <div className="member-avatar">
                                <img src={member.avatar || 'https://via.placeholder.com/150'} alt={member.name} />
                            </div>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <span className="member-role">{member.role}</span>
                                <p className="member-bio">{member.bio}</p>
                                <div className="member-socials">
                                    {/* Placeholder for social links */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-team">
                        <p>Our team is currently growing! Join us soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Team;
