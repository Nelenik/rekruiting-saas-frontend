'use client'
import { EMatchStatus, EMatchType } from "@/shared/types";
import EditButton from "./buttons/EditButton";
import { Badge } from "./ui/badge";
import { FC, useActionState, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { matchStatusesDict } from "@/shared/dictionaries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ConfirmButton from "./buttons/ConfirmButotn";
import CancelButton from "./buttons/CancelButotn";
import { updateMatch } from "@/actions/updateData";
import { mutationInitialState } from "@/actions/constants";
import convertToFormData from "@/lib/utils/convertToFormData";
import { useMatchStatuses } from "@/providers/MatchStatusProvider";
import { TMutationState } from "@/actions/types";

const matchTypeDict = {
  [EMatchType.SOURCING]: 'источник',
  [EMatchType.RESPONSE]: 'отклик'
}

const badgeColors: { [key: string]: string } = {
  [EMatchStatus.SCREENING]: 'ring-primary text-primary hover:text-white hover:bg-primary/70',
  [EMatchStatus.SCORING]: 'ring-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/70',
  [EMatchStatus.INTERVIEW]: 'ring-orange-500 text-orange-500 hover:text-white hover:bg-orange-500/70',
  [EMatchStatus.REFUSAL]: 'ring-destructive text-destructive hover:text-white hover:bg-destructive/70',
  [EMatchStatus.OFFER]: 'ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70',
  default: 'ring-gray-400 text-gray-400 hover:text-white hover:bg-gray-400/70'
}

type TProps = {
  matchId: string | number,
  type: EMatchType,
  status_id: number | string
  match_point: number;
  match_summary: string;
  cv_summary: string;
}

const CandyMatch: FC<TProps> = ({
  matchId,
  type,
  status_id,
  match_point,
  match_summary,
  cv_summary,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const matchStatuses = useMatchStatuses()

  const updateMathchWithId = updateMatch.bind(null, matchId)

  const [state, confirmAction, isPending] = useActionState<TMutationState, FormData>(
    updateMathchWithId,
    {
      ...mutationInitialState,
      payload: convertToFormData({ status_id, point: match_point })
    }
  )

  const formRef = useRef<HTMLFormElement>(null)

  //Extract default value from state and get defStatus object from matchStatuses
  const defValue = state.payload?.get('status_id') as string
  const defStatus = matchStatuses.find(status => String(status.id) === defValue)

  const handleConfirm = () => {
    formRef.current?.requestSubmit()
  }

  useEffect(() => {
    if (!isPending) {
      setIsEditing(false)
    }
  }, [isPending])

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className=" flex flex-col gap-6">
      <div>
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Мэтч
        </h2>
        <table className=" text-sm text-muted-foreground table-auto">
          <tbody>
            <tr>
              <td >Тип:</td>
              <td className="px-4 py-1">
                {matchTypeDict[type]}
              </td>
            </tr>
            <tr className="group">
              <td >Статус:</td>
              <td className="px-4 py-1">
                {isEditing
                  ? <form action={confirmAction} ref={formRef}>
                    <Select defaultValue={defValue} name="status_id">
                      <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0 h-8">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        {matchStatuses.map((status) => (
                          <SelectItem key={status.id} value={String(status.id)}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </form>
                  : <Badge
                    className={cn(
                      "py-1 bg-transparent ring-1",
                      defStatus ? badgeColors[defStatus.key] : badgeColors.default
                    )}
                  >
                    {defStatus?.name}
                  </Badge>
                }
              </td>
              <td>
                {isEditing
                  ? <CancelButton onClick={handleCancel} className="mr-2" />
                  : <EditButton
                    className="opacity-0 group-hover:opacity-100"
                    isIconView={true}
                    onClick={() => setIsEditing(true)}
                  />
                }
                {isEditing && <ConfirmButton onClick={handleConfirm} />}
              </td>
            </tr>
            <tr>
              <td >Балл:</td>
              <td className="px-4 py-1">
                {match_point}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Саммори по мэтчу
        </h2>
        <p className='text-muted-foreground text-sm'>
          {match_summary}
        </p>
      </div>

      <div>
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Саммори по резюме
        </h2>
        <p className='text-muted-foreground text-sm'>
          {cv_summary}
        </p>
      </div>
    </div>
  );
}

export default CandyMatch;