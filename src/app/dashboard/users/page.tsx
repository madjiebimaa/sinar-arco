import SearchInput from '@/components/internal/search-input';
import UserTable from '@/components/user/user-table';

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;

  return (
    <section className="flex flex-col space-y-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg text-slate-900">Users</h3>
        <p className="text-sm text-slate-600">
          A list of users retrieved from a Postgres database.
        </p>
      </div>
      <SearchInput />
      <UserTable query={query} page={page} />
    </section>
  );
}
