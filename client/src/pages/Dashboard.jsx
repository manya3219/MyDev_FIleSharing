import React from 'react';
import{useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';

import DashProfile from '../components/DashProfile';

export default function Dashboard() {
  const location=useLocation();
  const [tab,setTab]=useState('');
useEffect(()=>{
  const urlParams=new URLSearchParams(location.search);
  const tabFromUrl=urlParams.get('tab');
  if(tabFromUrl){
    setTab(tabFromUrl);
  }
},[location.search]);

  return (<div className='min-h-screen flex flex-col md:flex-row'>
    <div className='w-full md:w-56'>

      {/*Slidebar*/}
      <DashSidebar/>
    
    </div>
    {/*profile...*/}
    {tab==='profile'&&<DashProfile/>}
    {/*Posts*/}
    {tab==='posts'&&<DashPosts/>}
    {/*users*/}
    {tab==='users'&&<DashUsers/>}
    </div>
  )
}
