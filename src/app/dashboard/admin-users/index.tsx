import { SectionWrapper } from '@/components/container';
import {
  SearchInputWrapper,
  SearchInput,
} from '@/components/container/search-input';
import { userColumns } from './components/admin-user.constant';
import { DataPagination } from './components/pagination';
import { UsersTable } from './components/user-table';
import { useUserList } from './use-users-list';

const AdminUsers = () => {
  const {
    search,
    handleSearch,
    users,
    pagination,
    showLoading,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    isLoadingPagination,
  } = useUserList();

  return (
    <SectionWrapper title='User' className='space-y-4'>
      <SearchInputWrapper className='w-profile'>
        <SearchInput
          placeholder='Search User'
          name='search-user'
          value={search}
          onChange={handleSearch}
        />
      </SearchInputWrapper>

      <UsersTable
        data={users}
        columns={userColumns}
        currentPage={pagination?.page}
        pageSize={pagination?.limit}
        isLoading={showLoading}
        emptyMessage={
          search ? `No users found for "${search}"` : 'No users available'
        }
        pagination={
          pagination && pagination.totalPages > 1 ? (
            <DataPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              hasNextPage={pagination.page < pagination.totalPages}
              hasPrevPage={pagination.page > 1}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              onPageChange={handlePageChange}
              isLoading={isLoadingPagination}
              showInfo
            />
          ) : undefined
        }
      />
    </SectionWrapper>
  );
};

export default AdminUsers;
