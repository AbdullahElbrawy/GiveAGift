import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import axios from 'axios';

const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilter(value);
        }, 300); // wait 300ms after the last key stroke to set the filter
        return () => clearTimeout(timeout);
    }, [value, setFilter]);

    return (
        <span>
            Search: {' '}
            <input
                value={value || ''}
                onChange={e => setValue(e.target.value)}
                placeholder="Type to search..."
            />
        </span>
    );
};

const TransactionsTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://gifts-backend.onrender.com/api/transactions');
                setData(response.data.map(tr => ({
                    ...tr,
                    cardTitles: tr.cartDetails.map(d => d.cardTitle).join(", "),
                    cardDescriptions: tr.cartDetails.map(d => d.cardDescription).join(", "),
                    brandNames: tr.cartDetails.map(d => d.brandName).join(", "),
                    brandLogos: tr.cartDetails.map(d => d.brandLogo)
                })));
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };
        fetchData();
    }, []);

    const columns = useMemo(() => [
        { Header: 'Transaction ID', accessor: 'transactionId' },
        { Header: 'Cart ID', accessor: 'cartId' },
        { Header: 'Payment Value', accessor: 'paymentValue' },
        { Header: 'Message Date', accessor: 'messageDate' },
        { Header: 'Card URL', accessor: 'cardUrl', Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">View Card</a> },
        { Header: 'Process Date', accessor: 'processDate' },
        { Header: 'Card Titles', accessor: 'cardTitles' },
        { Header: 'Card Descriptions', accessor: 'cardDescriptions' },
        { Header: 'Brand Names', accessor: 'brandNames' },
        { Header: 'Brand Logos', accessor: 'brandLogos', Cell: ({ value }) => value.map((url, index) => url ? <img key={index} src={url} alt="Brand" style={{ width: 50, height: 50 }}/> : 'N/A') }
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

    return (
        <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
            <div>
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
