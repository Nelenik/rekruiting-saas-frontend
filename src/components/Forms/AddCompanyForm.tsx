import { createCompany } from "@/actions/postData";
import FormItem from "./form_elements/FormItem";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import DatePicker from "./form_elements/DatePicker";
import { Button } from "../ui/button";

const AddCompanyForm = () => {
  return (
    <form action={createCompany} className="flex flex-col justify-between grow">
      <div className="columns-2 gap-6">
        <FormItem labelText="Название">
          <Input placeholder="Название" name="name" />
        </FormItem>
        <FormItem labelText="Полное наименование">
          <Textarea placeholder="Полное наименование" name="full-name" className="resize-none" rows={9}></Textarea>
        </FormItem>
        <FormItem labelText="Описание">
          <Textarea placeholder="Описание организации" name="description" className="resize-none" rows={17}></Textarea>
        </FormItem>
        <FormItem labelText="ИНН" className="break-before-column">
          <Input placeholder="ИНН" name="inn" />
        </FormItem>
        <FormItem labelText="Тариф">
          <Select name="rate">
            <SelectTrigger >
              <SelectValue placeholder="Выбранный тарифный план" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Первый тариф">Первый тариф</SelectItem>
              <SelectItem value="Второй тариф">Второй тариф</SelectItem>
              <SelectItem value="Третий тариф">Третий тариф</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
        <FormItem labelText="Дата оплаты">
          <DatePicker nameAttr="pay-date" />
        </FormItem>
      </div>

      <div className="self-end">
        <Button variant={'ghost'} className="mr-2">
          Отмена
        </Button>
        <Button type="submit">
          Создать
        </Button>
      </div>
    </form>
  );
}

export default AddCompanyForm;