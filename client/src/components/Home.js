import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DescriptionIcon from '@mui/icons-material/Description';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Home = () => {
    const [openModalId, setOpenModalId] = useState(null);
    const handleOpen = (id) => setOpenModalId(id);
    const handleClose = () => setOpenModalId(null);

    const [getuserdata, setUserData] = useState([]);

    const getdata = async () => {
        try {
            const res = await fetch("/getdata");
            const data = await res.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    const deleteuser = async (id) => {
        try {
            await fetch(`/deleteuser/${id}`, {
                method: "DELETE"
            });
            getdata();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    return (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                    </div>
                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {getuserdata.map((element, id) => (
                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.work}</td>
                                    <td>{element.mobile}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => handleOpen(element._id)}><RemoveRedEyeIcon /></button>
                                        <Modal
                                            open={openModalId === element._id} 
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Choose a format to view
                                                </Typography><br/>
                                                <NavLink to={`view/${element._id}`}><button className="btn btn-success mb-3"><DescriptionIcon/> Format_1</button></NavLink><br/>
                                                <NavLink to={`view_1/${element._id}`}><button className="btn btn-warning mb-3" style={{color: 'white'}}><DescriptionIcon/> Format_2</button></NavLink><br/>
                                                <NavLink to={`view_2/${element._id}`}><button className="btn btn-info" style={{color: 'white'}}><DescriptionIcon/> Format_3</button></NavLink>
                                            </Box>
                                        </Modal>
                                    </td>
                                    <td className="d-flex justify-content-between">
                                        <NavLink to={`edit/${element._id}`}><button className="btn btn-primary"><EditIcon /></button> </NavLink>
                                        <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><DeleteIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
