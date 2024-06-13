import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import Case from '../components/Case'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Bar,BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function Dashboard() {
     const [stuff ,setStuff] = useState([]);
     const [user ,setUser] = useState([]);
    //  const [ datares, setDataRes] = useState([0]);
     const [lendingGrouped ,setLendingGrouped] = useState([]);
     const [totalStuff, setTotalStuff] = useState([0]);
     const [checkProses, setCheckProses] = useState(false);
     const navigate = useNavigate();

     useEffect(() => {
      getDataStuff();
      getDataUser();
      getDataLending();
      // getDataRestoration();
       },[checkProses]);

     function getDataStuff() {
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
     function getDataUser(){
      axios.get(`http://localhost:8000/user/data`,{
        headers: {
          'Authorization': 'Bearer' + localStorage.getItem('access_token'),
     }
})
.then (res =>{
     setUser(res.data.data);
})
.catch (err => {
     console.log(err);
     if (err.response.status = 401 ) {
          navigate('/login?message=' +encodeURIComponent('anda belum login!'));
                    }
     })

     }
     function getDataLending() {
      axios.get(`http://localhost:8000/Lending/data`, {
        headers: {
          'Authorization': 'Bearer' + localStorage.getItem('access_token'),
     }
      })
      .then (res => {
        const data = res.data.data;
        const groupedData = {};

        data.forEach((entry)=> {
          const date = new Date(entry.date_time);
          const formattedDate = `${date.getDate() } -${date.getMonth() + 1} - ${date.getFullYear()}`;
            if(!groupedData[formattedDate]) {
              groupedData[formattedDate] = [];
            }
            groupedData[formattedDate].push(entry);
        });
        const processedData = Object.keys(groupedData).map((date)=> ({
          date,
          totalStuff: groupedData[date].reduce ((acc,entry) => acc + entry.total_stuff,0)
        }));
        const totalStuffAmount = data.reduce((acc, entry) => acc + entry.total_stuff, 0);
        setLendingGrouped(processedData);
        setTotalStuff(totalStuffAmount);
        setCheckProses(true)
      })
      .catch(err => {
        if (err.response.status = 401 ) {
          navigate('/login?message=' +encodeURIComponent('anda belum login!'));
                    }
      })
     }
  //    function getDataRestoration() {
  //     axios.get(`http://localhost:8000/restoration/data`,{
  //       headers: {
  //         'Authorization': 'Bearer' + localStorage.getItem('access_token'),
  //    }
  //    })
  //  .then (res =>{
  //    const data = res.data.data;
  //   data.forEach((entry) => {
  //   const datagood= data.reduce((acc, entry) => acc + entry.total_good_stuff , 0);
  //   const datadefec= data.reduce((acc, entry) => acc + entry.total_defec_stuff , 0);
  // })
  //  setDataRes(datares);
  //  setCheckProses(true)
  
// })
// .catch (err => {
//      console.log(err);
//      if (err.response.status = 401 ) {
//           navigate('/login?message=' +encodeURIComponent('anda belum login!'));
//                     }
//      })
    //  }
       return (
    <Case>
      <div className="flex flex-wrap justify-center m-10">
                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{stuff.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{user.length}</h1>
                        </div>
                    </div>
                </div>
                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data yang dipinjam </h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{totalStuff}</h1>
                        </div>
                    </div>
                </div>
                {/* <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data yang dikembalikan
                            </h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                        <h1 className="text-white dark:text-white text-lg font-medium"></h1>
                        </div>
                    </div>
                </div> */}
            </div>
            <ResponsiveContainer width= "100px" height={400}>
              <BarChart data={lendingGrouped}
              margin={
                {
                  top: 10,
                  left:10,
                  right:20,
                  bottom:10
                }
              }
              >
                <CartesianGrid strokeDasharray= "3 3"></CartesianGrid>
                 <XAxis dataKey="date"></XAxis>
                 <YAxis></YAxis>
                 <Tooltip></Tooltip>
                 <Legend></Legend>
                 <Bar dataKey="totalStuff" fill="#2563eb"></Bar>
              </BarChart>
            </ResponsiveContainer>
    </Case>
  )
}
