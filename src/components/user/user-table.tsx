import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UserTablePagination from '@/components/user/user-table-pagination';

import { USERS_PER_PAGE } from '@/lib/constants';
import { getTotalUsers, getUsers } from '@/prisma/user';

interface UserTableProps {
  query: string;
  page: number;
}

export default async function UserTable({ query, page }: UserTableProps) {
  const [users, totalUsers] = await Promise.all([
    getUsers(query, page),
    getTotalUsers(query),
  ]);
  const totalPages = Math.round(totalUsers / USERS_PER_PAGE);

  return (
    totalUsers !== 0 && (
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.name}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>@{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="bg-white">
                  <UserTablePagination totalPages={totalPages} />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    )
  );
}
