import React, { useEffect, useState } from 'react'
import axios from "axios";
import baseurl from '../middleware/baseurl';
import { Link } from 'react-router-dom';


function ProblemList() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProblems = async () => {
        setLoading(true);
        try {
            const response = await axios.post(baseurl + "/getProblems");
            // response = JSON.parse(response)
            // console.log(response.data)
            setProblems([...response.data])
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProblems();
    }, []);

    return (
        loading 
        ?
        <p>loading</p>
        :
        problems
        ?
        <>
            <div>
                <h1>
                    List of all problems : 
                </h1>
            </div>
            {
                problems.map((x, index) => {
                    return (
                        <div key={index} style={{display: "flex", flexDirection: "row"}} > 
                            <div style={{marginRight: "5px"}}>
                                <p>{index + 1}</p>
                            </div>
                            <div>
                                <p><Link to={"/problems/" + x._id}>{x.heading}</Link></p>
                            </div>
                        </div>
    
                    )
                })
            }
        </>
        :
        <p>We are trying to add more problems!</p>
    )
}

export default ProblemList