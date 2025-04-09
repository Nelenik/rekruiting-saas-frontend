import { Card } from "../shadcn/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/table";

export const TableSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader className="bg-background">
          <TableRow>
            <TableHead className="w-[30%]">
              Название
            </TableHead>
            <TableHead>
              ИНН
            </TableHead>
            <TableHead>
              Тариф
            </TableHead>
            <TableHead>
              Дата подключения
            </TableHead>
            <TableHead>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {Array.from({ length: 15 }, (_, i) => (
            <TableRow key={i} className="border-b-0 animate-pulse">
              <TableCell className="font-medium text-left text-sm">
                <p className="w-[75%] h-4  bg-gray-200 rounded-full dark:bg-gray-700"></p>
              </TableCell>
              <TableCell className="font-medium text-left text-sm">
                <p className="w-[75%] h-4  bg-gray-200 rounded-full dark:bg-gray-700"></p>
              </TableCell>
              <TableCell className="font-medium text-left text-sm">
                <p className="w-[75%] h-4  bg-gray-200 rounded-full dark:bg-gray-700"></p>
              </TableCell>
              <TableCell className="font-medium text-left text-sm">
                <p className="w-[75%] h-4  bg-gray-200 rounded-full dark:bg-gray-700"></p>
              </TableCell>
              <TableCell>
                <p className="w-[75%] h-4  bg-gray-200 rounded-full dark:bg-gray-700"></p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}