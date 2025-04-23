// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'chatId', headerName: 'Chat ID', width: 130 },
    { field: 'agent', headerName: 'Agent', width: 130 },
    { field: 'status', headerName: 'Status', width: 90 },
];

const rows = [
    { id: 1, chatId: 'chat001', agent: 'Agent Smith', status: 'Active', lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, chatId: 'chat002', agent: 'Agent Johnson', status: 'Inactive', lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, chatId: 'chat003', agent: 'Agent Anderson', status: 'Pending', lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    // Add more rows as needed...
];

export default function Table() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
