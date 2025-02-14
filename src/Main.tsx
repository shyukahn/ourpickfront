import React, { useState, useEffect } from 'react';
import './css/Main.css'
import TopNavMenu from './components/TopNavMenu';
import { useNavigate } from 'react-router-dom';

interface Room {
    room_id: number;
    room_title: string;
    google_account: string;
    subject_name: string;
    max_people: number;
    current_people: number;
    is_started: boolean;
}

const Main : React.FC = ()=> {
    const [roomsData, setRoomsData] = useState<Room[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms/current-room/`);
                const data = await response.json();
                setRoomsData(data);
            } catch (error) {
                console.error('Error fetching rooms data:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleRoomClick = (roomId: number) => {
        navigate(`/ready/${roomId}`);
    };
    
    return (
        <div>
            <TopNavMenu />
                <div className='container'>
                    {roomsData.map(room => (
                        <div key={room.room_id} className="room-card" onClick={() => handleRoomClick(room.room_id)} style={{ cursor: 'pointer' }}>
                            <h3>{room.room_title}</h3>
                            <p>주제: {room.subject_name}</p>
                            <p className='people-count'>{room.current_people}/{room.max_people}</p>
                        </div>
                    ))}
                </div>
        </div>
        
    );
}

export default Main;