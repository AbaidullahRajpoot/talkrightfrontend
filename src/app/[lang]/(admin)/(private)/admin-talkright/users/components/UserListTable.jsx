'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import { toast } from 'react-toastify'

import CustomAvatar from '@core/components/mui/Avatar'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { useGetUserListQuery, useDeleteUserMutation } from '@/redux-store/api/talkrightApi'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import ProgressCircularCustomization from '@/components/loader'
import Loading from '@/components/loading/loading'



const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const ConfirmationDialog = ({ open, onClose, onConfirm, id, message }) => {
  const handleConfirm = () => {
    onConfirm(id);
    onClose();
  };

  return (
    <Dialog style={{ height: "50%" }} open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};



// Column Definitions
const columnHelper = createColumnHelper()

const UserTableList = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Hooks
  const { lang: locale } = useParams()
  const { data: rsData, isLoading, refetch: refetchUserList } = useGetUserListQuery()
  const [deleteUser, { isLoading: isDeleteUserLoading, isSuccess, isError }] = useDeleteUserMutation();

  //======================================Delete Function============================================
  const deleteAuthUser = async (id) => {
    try {
      const data = {
        userId: id
      }

      const deleteuserResult = await deleteUser({ data: data });

      if (deleteuserResult?.data?.message == 'User deleted successfully') {
        setData(prevData => prevData.filter(user => user.id !== id));
        setFilteredData(prevData => prevData.filter(user => user.id !== id));
        toast.success(deleteuserResult?.data?.message)
      }
      else {
        toast.error(deleteuserResult?.error?.data?.message)
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error(error.data.message);

    }
  }

  //======================================Dialog Box Code ============================================
  const handleOpenDialog = (id) => {
    setCurrentId(id)
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = async (id) => {
    // Handle the confirmation logic here
    setDialogOpen(false);
    deleteAuthUser(id)
  };



  //Call whenever page rendered 
  useEffect(() => {
    if (rsData) {
      setData(rsData)
      setFilteredData(rsData)
    }
  }, [rsData])

  useEffect(() => {
    refetchUserList()
  }, [])


  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <CustomAvatar src={row.original.image} size={34} />
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.name + " " + row.original.lname}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('username', {
        header: 'Username',
        cell: ({ row }) => (

          <Typography className='font-medium' color='text.primary'>
            {row.original.username}
          </Typography>
        )
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => <Typography>{row.original.email}</Typography>
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        cell: ({ row }) => <Typography>{row.original.phoneNumber}</Typography>
      }),
      columnHelper.accessor('gender', {
        header: 'Gender',
        cell: ({ row }) => <Typography>{row.original.gender}</Typography>
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        cell: ({ row }) => <Typography>{row.original.country}</Typography>
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Link href={`/${locale}//admin-talkright/users/edit/${row.original.id}`} passHref>
              <IconButton>
                <i className='tabler-edit' />
              </IconButton>
            </Link>
            <IconButton onClick={() => { handleOpenDialog(row.original.id) }}>
              <i className='tabler-trash' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>

      {isLoading == true ?
        <ProgressCircularCustomization />
        :
        <Card>
          <div className='flex flex-wrap justify-between gap-4 p-6'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search User'
              className='max-sm:is-full'
            />
            <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
              <CustomTextField
                select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className='flex-auto is-[70px] max-sm:is-full'
              >
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value='25'>25</MenuItem>
                <MenuItem value='50'>50</MenuItem>
              </CustomTextField>
              <Button
                variant='contained'
                component={Link}
                className='max-sm:is-full is-auto'
                href={getLocalizedUrl('/admin-talkright/users/add', locale)}
                startIcon={<i className='tabler-plus' />}
              >
                Add User
              </Button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              className={classnames({
                                'flex items-center': header.column.getIsSorted(),
                                'cursor-pointer select-none': header.column.getCanSort()
                              })}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <i className='tabler-chevron-up text-xl' />,
                                desc: <i className='tabler-chevron-down text-xl' />
                              }[header.column.getIsSorted()] ?? null}
                            </div>
                          </>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                      No data available
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table
                    .getRowModel()
                    .rows.slice(0, table.getState().pagination.pageSize)
                    .map(row => {
                      return (
                        <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                          ))}
                        </tr>
                      )
                    })}
                </tbody>
              )}
            </table>
          </div>
          <TablePagination
            component={() => <TablePaginationComponent table={table} />}
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            onPageChange={(_, page) => {
              table.setPageIndex(page)
            }}
          />
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirm}
            id={currentId}
            message="Are you sure you want to delete?"
          />
          {
            isDeleteUserLoading == true && <Loading />
          }
        </Card>

      }

    </>
  )
}

export default UserTableList
