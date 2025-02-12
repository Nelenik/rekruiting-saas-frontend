'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TCompany } from "@/shared/types/companies";
import { format } from "date-fns";
import { FC } from "react";
import { Card } from "./ui/card";
import EditEntityModal from "./modals/EditEntityModal";

type TProps = {
  companiesList: TCompany[]
}

const CompaniesTable: FC<TProps> = ({
  companiesList
}) => {
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
          {companiesList.map(company => (
            <TableRow key={company.id} onClick={() => console.log('clicked row')} className="cursor-pointer hover:bg-gray-100 border-b-0">
              <TableCell className="font-medium text-left text-sm">
                {company.name}
              </TableCell>
              <TableCell className="font-medium text-left text-sm">
                {company.inn}
              </TableCell>
              <TableCell className="font-medium text-left text-sm">
                {company.rate}
              </TableCell>
              <TableCell className="font-medium text-left text-sm">
                {format(new Date(company.rate_at), "dd.MM.yyyy")}
              </TableCell>
              <TableCell>
                <EditEntityModal initialData={company} entityType="company" triggerView="icon" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default CompaniesTable;