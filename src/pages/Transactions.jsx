import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const GlobalFilter = ({ filter, setFilter }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState(filter);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilter(value);
        }, 300);
        return () => clearTimeout(timeout);
    }, [value, setFilter]);

    return (
        <span>
            {t('transactions.search')}:{' '}
            <input
                className='p-2 ml-5 border border-gray-500 border-solid'
                value={value || ''}
                onChange={e => setValue(e.target.value)}
                placeholder={t('transactions.typeToSearch')}
            />
        </span>
    );
};

const TransactionsTable = () => {
    const { t } = useTranslation();
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
                shopName: tr.shopName,
                clientName: tr.clientName,
                clientPhone: tr.clientPhone,

                processDate: new Date(tr.processDate).toLocaleString(),
                
            })));
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        }
    };

    const columns = useMemo(() => [
        { Header: t('transactions.transactionId'), accessor: 'transactionId' },
        { Header: t('transactions.paymentValue'), accessor: 'paymentValue' },
        { Header: t('transactions.messageDate'), accessor: 'messageDate' },
        { Header: t('transactions.cardUrl'), accessor: 'cardUrl', Cell: ({ value }) => <a href={value} className='text-secondary-500' target="_blank" rel="noopener noreferrer">{t('transactions.viewCard')}</a> },
        { Header: t('transactions.shopName'), accessor: 'shopName' },
        { Header: t('transactions.clientName'), accessor: 'clientName' },
        { Header: t('transactions.clientPhone'), accessor: 'clientPhone' },

        { Header: t('transactions.processDate'), accessor: 'processDate' },

    ], [t]);

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
         
            <div className='flex justify-between gap-3 items-center'>
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
                  <button onClick={handleExport} className="bg-secondary-500  text-white font-bold py-2 px-4 rounded my-3">
                    {t('transactions.exportTransactions')}
                  </button>
            </div> 
               <div className='flex items-center'>
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
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>{t('transactions.previous')}</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>{t('transactions.next')}</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                <span>
                    {t('transactions.page')}{' '}
                    <strong>
                        {pageIndex + 1} {t('transactions.of')} {pageOptions.length}
                    </strong>
                </span>
            </div>
        </div>
    );
};

export default TransactionsTable;
