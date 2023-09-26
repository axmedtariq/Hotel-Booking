import './datatable.scss';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatablesource";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Datatable = () =>{

  const { data, loading, error } = useFetch("/users");
  const [list, setList] = useState();

    useEffect(() => {
    setList(data);
  }, [data]);

  const actionColumn = [

  {
    field:"action",
    headerName:"Action",
    width:200,
    renderCell: () => {
      return (
        <div className="CellAction">
        <Link to="/users/test" style={{ textDecoration:"none" }}>
        <div className="viewButton">View</div>
        </Link>
        <div className="deleteButton">Delete</div>
        </div>
        

        )
    }
  }
  ]
	return(
    <div className="datatable">
     <div className="datatableTitle">

        Add New User
        <Link to="/users/new" style={{ textDecoration:"none" }} className="link">
        Add New
        </Link>
        </div>


		 <DataGrid className="datagrid"
        rows={data || []}
        columns={userColumns.concat(actionColumn)}
        pageSize={11}
        rowsPerPageOptions={[11]}
        checkboxSelection
        getRowId={(row) => row._id}/>

      />
			


		</div>



		);
}
export default Datatable;