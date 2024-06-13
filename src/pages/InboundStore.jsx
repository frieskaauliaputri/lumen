import React, {useState,useEffect, Link} from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Inbound(){
    const  [ inbound , setInbound] = useState([]);
   // set = menampungvalue  , tanpa set = menampilkan 
    const navigate = useNavigate();
     // navigate = yg di dalam router 
    useEffect(() => {
        // useeffect = menjalankan suatu aksi 
        getInbound()
    },[]);
    // kondisi [] = render di awal 
    
     function getInbound(){
        axios.get(`http://localhost:8000/inbound-stuff/data`,{
            headers: {
              'Authorization': 'Bearer' + localStorage.getItem('access_token'),
         }
    })
    .then (res =>{
         setInbound(res.data.data);
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
        "stuff_id",
        "total",
        "date",
        "proff_file",
     ]
     const endPointModal = {
        // "data_detail": "http://localhost:8000/inbound-stuff/data",
        // "update": "http://localhost:8000/inbound-stuff/update/{id}",
        // "store": "http://localhost:8000/inbound-stuff/store",
        "delete": "http://localhost:8000/inbound-stuff/delete/{id}",
     }
     const inputData = {
        "stuff_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "total" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "date" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "proff_file" :{
            "tag": "input",
            "type": "text",
            "option": null
        }
     }
     const columnIdentitasDelete = 'stuff_id';
     const title = 'Inbound'

     const buttons = [
        // "store",
        // "trash",
        // "edit",
        "delete"
     ]
     const tdColumn = {
        "stuff_id": null,
        "total": null,
        "date": null,
        "proff_file":null,
     }
    return(
        <Case>
            <Table headers={headers} data={inbound} endpoint={endPointModal} inputData={inputData} titleModal={title}
            identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    );
    
}