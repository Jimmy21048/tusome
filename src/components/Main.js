import { useNavigate } from "react-router-dom"
import Header from "./Header"
import axios from 'axios'
import { useState } from "react"

export default function Main() {
    const[course, setCourse] = useState('true')
    const[query, setQuery] = useState()
    const[filteredCourse, setFilteredCourse] = useState([])
    const history = useNavigate()
    axios.defaults.withCredentials = true

    axios.get(process.env.REACT_APP_ACCOUNT, {
        headers: {
            "Content-Type": "application/json"
        },
    }).then(response => {
        if(response.data.valid === false) {
            return history('/login')
        } else {
            setCourse(response.data.course)
        }

    }).catch(err => {
        console.log("Could not complete operation")
    })
    
    const handleChange = (e) => {
        const value = e.target.value.toLowerCase()
        // setQuery(value)

        if(value) {
            setFilteredCourse(course.filter((item) => {
                return item.course_name.toLowerCase().includes(value)
            }));
        } else {
            setFilteredCourse([])
        }
    }
    return (
        <div className="main">
            <Header />
            <div className="hero">
                <div className="hero-left">
                    <div className="upload">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className="filter-options">
                        <label>Year
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            </select>
                        </label>
                        <label>Semester
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </label>
                        <label>Type
                            <select>
                                <option>all</option>
                                <option>file</option>
                                <option>video link</option>
                            </select>
                        </label>
                        <label>Course
                            <input onChange={(e) => handleChange(e)} />
                            <ul>
                                {
                                    filteredCourse.map((item, index) => {
                                        return <li key={item.course_code}>
                                            {item.course_name}
                                        </li>
                                    })
                                }
                            </ul>
                        </label>
                        <label>Unit
                            <input />
                            
                        </label>
                        <button className="hero-btn1">Search</button>
                        <button className="hero-btn1">Preferences</button>
                    </div>
                </div>
                <div className="hero-right"></div>
            </div>
        </div>
    )
}