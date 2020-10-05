import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Head from '../Head/Head';
import './EventItem.css'
import SingleEvent from './SingleEvent';

const EventItem = () => {
    const [eventData, setEventData] = useState([])
    const { loggedInUser } = useContext(UserContext)
    const [isDeleted, setIsDeleted] = useState(false);


    useEffect(() => {
        fetch(`https://stormy-sierra-88296.herokuapp.com/data?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => {
                setEventData(data);
                setIsDeleted(false);
            })
    }, [loggedInUser.email,isDeleted])

    const handleDelete = (id) => {
        fetch(`https://stormy-sierra-88296.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((result => {
                if (result) {
                    setIsDeleted(true);
                }
            }));
    }

    return (
        <>
        <Head></Head>
            {
                loggedInUser.email ?
                    <div className="row text-center">
                        {/* <Head></Head> */}
                        {
                            eventData.map(data => <SingleEvent item={data} handleDelete={handleDelete}></SingleEvent>)
                        }
                    </div>
                    :
                    <h1>Not Found</h1>
            }
        </>
    )
};

export default EventItem;