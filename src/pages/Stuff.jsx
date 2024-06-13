import React, {useState,useEffect, Link} from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Stuff(){
    const  [ stuff , setStuff] = useState([]);
   // set = menampungvalue  , tanpa set = menampilkan 
    const navigate = useNavigate();
     // navigate = yg di dalam router 
    useEffect(() => {
        // useeffect = menjalankan suatu aksi 
        getStuff()
    },[]);
    // kondisi [] = render di awal 
    
     function getStuff(){
        axios.get(`http://localhost:8000/stuff/data`,{
            headers: {
              'Authorization': 'Bearer' + localStorage.getItem('access_token'),
         }
    })
    .then (res =>{
         setStuff(res.data.data);
    })
    .catch (err => {
         console.log(err);
         if (err.response.status = 401 ) {
              navigate('/login?message=' +encodeURIComponent('anda belum login!'));
                        }
         })
     }
     const headers = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
     ]
     const endPointModal = {
        "data_detail": "http://localhost:8000/stuff/{id}",
        "delete": "http://localhost:8000/stuff/delete/{id}",
        "update": "http://localhost:8000/stuff/{id}",
        "store": "http://localhost:8000/stuff/store",
     }
     const inputData = {
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category" : {
            "tag": "select",
            "type": "select",
            "option": ["KLN","HTL","Teknisi/Sarpras"]
        }
     }
     const columnIdentitasDelete = 'name';
     const title = 'Stuff'

     const buttons = [
        "store",
        "trash",
        "edit",
        "delete"
     ]
     const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock":"total_available",
        "stuff_stock*":"total_defec",
     }
    return(
        <Case>
            <Table headers={headers} data={stuff} endpoint={endPointModal} inputData={inputData} titleModal={title}
            identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    );
    
}