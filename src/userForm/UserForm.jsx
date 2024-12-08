import React, { useEffect, useState } from 'react'
import './userform.css'
import generateUniqueId from 'generate-unique-id'

function UserForm() {
    const [alrtMessage, setAlrtMessage] = useState('')
    const [showPopup, setShowPopup] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const [user, setUser] = useState({
        id: '',
        fname: '',
        email: '',
        phone: '',
        pass: '',
        con_pass: ''
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const [dispaly, setDisplay] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!user.id) {
            if (user.phone.length === 10) {
                if (user.pass === user.con_pass) {
                    const UserId = ({
                        ...user,
                        id: generateUniqueId({
                            length: 4,
                            useLetters: false,
                        })
                    })

                    setDisplay([...dispaly, UserId])
                    setAlrtMessage('')

                    setUser({
                        fname: '',
                        phone: '',
                        email: '',
                        pass: '',
                        con_pass: ''
                    })
                } else {
                    const alrtMessage = 'Passowrd is not matching ..please Renter Your password..'
                    setAlrtMessage(alrtMessage)
                }


            } else {
                setAlrtMessage('Please Enter Your 10 Digit Mobile Number')
            }
        } else {
            const prvRecord = dispaly
            const updateRecord = prvRecord.map((rec) => {
                if (rec.id === user.id) {
                    return rec = user
                }
                return rec
            })

            console.log("record", updateRecord);
            setDisplay(updateRecord)
            setAlrtMessage('')

        }



    }

    const Edit = (id) => {
        const EditUser = dispaly.find((Euser) => {
            return Euser.id === id
        })
        setUser(EditUser)
    }

    const deleteUser = () => {
        const deleteUser = dispaly
        const deletRec = deleteUser.filter((Duser) => {
            return Duser.id !== deleteId
        })
        setDisplay(deletRec)
        setShowPopup(false)
    }

    const handleDeleteUser = (id) => {
        setDeleteId(id)
        setShowPopup(true)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-5">

                        <form onSubmit={handleSubmit}>
                            {
                                user.id
                                    ?
                                    <h2>User Update Form</h2>
                                    :
                                    <h2>User Ragistarttio form</h2>
                            }

                            <hr />
                            <hr />

                            {alrtMessage && (
                                <p style={{ color: 'red', fontSize: '14px' }}>{alrtMessage}</p>
                            )}
                            <br />
                            <label>Full Name :</label>
                            <input type="text" placeholder='Enter Your fullname' name='fname' onChange={handleInput} value={user.fname} />

                            <label>Email :</label>
                            <input type="email" placeholder='Enter your Email id' name='email' onChange={handleInput} value={user.email} />

                            <label>Mobile Number :</label>
                            <input type="tel" placeholder='Enter Your 10 Digit Mobile Number' name='phone' onChange={handleInput} value={user.phone} />

                            {
                                user.id ? (
                                    <>
                                        <label>Password :</label>
                                        <input type="password" placeholder='Enter Password' name='pass' onChange={handleInput} value={user.pass} disabled />

                                        <label>Con_pass</label>
                                        <input type="password" placeholder='Enter confirm Password' name='con_pass' onChange={handleInput} value={user.con_pass} disabled />
                                    </>
                                )
                                    :
                                    (
                                        <>
                                            <label>Password :</label>
                                            <input type="password" placeholder='Enter Password' name='pass' onChange={handleInput} value={user.pass} />

                                            <label>Con_pass</label>
                                            <input type="password" placeholder='Enter confirm Password' name='con_pass' onChange={handleInput} value={user.con_pass} />
                                        </>
                                    )
                            }



                            <div className='btn-area'>
                                {
                                    user.id
                                        ?
                                        <button type='submit' className='btn'>Update</button>
                                        :
                                        <button type='submit' className='btn'>Submit</button>
                                }


                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <br />
            <hr />
            <br />
            <br />
            <div className="container">
                <h2 align="center">Display Data</h2>
                <br />
                <br />
                <div className="row">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dispaly.length > 0 ?
                                    dispaly.map((U) => {
                                        return (
                                            <tr>
                                                <td>{U.id}</td>
                                                <td>{U.fname}</td>
                                                <td>{U.email}</td>
                                                <td>{U.phone}</td>
                                                <td>{U.pass}</td>
                                                <td className='btn-group'>
                                                    <button className='btn1' onClick={() => Edit(U.id)}>edit</button>
                                                    {

                                                    }
                                                    <button className='btn2' onClick={() => handleDeleteUser(U.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <h3>Data is Empty...</h3>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <br /><br />

            {
                showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h3>Are you sure you want to delete this record?</h3>
                            <button onClick={deleteUser}>Confirm</button>
                            <button onClick={() => setShowPopup(false)}>Cancel</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserForm
