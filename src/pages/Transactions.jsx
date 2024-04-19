import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import axios from 'axios';

const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilter(value);
        }, 300);
        return () => clearTimeout(timeout);
    }, [value, setFilter]);

    return (
        <span>
            Search: {' '}
            <input
            className='p-5 ml-5'
                value={value || ''}
                onChange={e => setValue(e.target.value)}
                placeholder="Type to search..."
            />
        </span>
    );
};

const TransactionsTable = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://gifts-backend.onrender.com/api/transactions', {
                params: {
                    startDate,
                    endDate
                }
            });
            // Map the response data to match your table structure
            setData(response.data.map(tr => ({
                transactionId: tr?.cartId,
                paymentValue: tr.paymentValue,
                messageDate: new Date(tr.messageDate).toLocaleString(),
                cardUrl: tr.cardUrl,
                processDate: new Date(tr.processDate).toLocaleString(),
            })));
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        }
    };

    const columns = useMemo(() => [
        { Header: 'Transaction ID', accessor: 'transactionId' },
        { Header: 'Payment Value', accessor: 'paymentValue' },
        { Header: 'Message Date', accessor: 'messageDate' },
        { Header: 'Card URL', accessor: 'cardUrl', Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">View Card</a> },
        { Header: 'Process Date', accessor: 'processDate' },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        setGlobalFilter,
        gotoPage,
        pageCount
    } = useTable({ columns, data }, useGlobalFilter, useFilters, useSortBy, usePagination);

    const { globalFilter, pageIndex } = state;

    const handleExport = async () => {
        try {
            const response = await axios.get('https://gifts-backend.onrender.com/api/download-transactions', {
                responseType: 'blob',
                params: {
                    startDate,
                    endDate
                }
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'transactions.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting transactions:', error);
        }
    };

    return (
        <div>
         
            <div className='flex justify-between gap-3'>
               <div className='flex justify-between gap-3'> 
               <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />
                  <button onClick={handleExport} className="bg-secondary-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">
                Export Transactions
            </button>
            </div> 
               <div>
               <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
               </div>
            </div>
         
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 mt-5">
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
                        {page.map(row => {
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
            </div>
            <div className="pagination flex  gap-5 ml-auto justify-end mt-5">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
            </div>
        </div>
    );
};

export default TransactionsTable;
