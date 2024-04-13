import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import axios from 'axios';

const TransactionsTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://gifts-backend.onrender.com/api/transactions');
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };
        fetchData();
    }, []);

    const columns = useMemo(() => [
        { Header: 'Transaction ID', accessor: 'cartId' },
        { Header: 'Payment Value', accessor: 'paymentValue' },
        { Header: 'Message Date', accessor: 'messageDate' },
        { Header: 'Card URL', accessor: 'cardUrl', Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">View Card</a> },
        { Header: 'Process Date', accessor: 'processDate' }
    ], []);

    const tableInstance = useTable({ columns, data }, useFilters, useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance;

    return (
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TransactionsTable;
