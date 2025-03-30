'use client'
import { Input } from "@/components/ui/input";
import FormItem from "./form_elmts/FormItem";
import { storeMatchComment } from "@/actions/postData";
import { FC } from "react";
import { useFormMutation } from "@/hooks/useFormMutation";

type TProps = {
  matchId: number | string
}

const CommentsForm: FC<TProps> = ({
  matchId
}) => {
  const action = storeMatchComment.bind(null, matchId)

  const { formAction, pending, } = useFormMutation({
    mutationAction: action
  })

  return (
    <form action={formAction}>
      <FormItem
        labelText="Введите комментарий"
      >
        <Input />
      </FormItem>

    </form>
  );
}

export default CommentsForm;