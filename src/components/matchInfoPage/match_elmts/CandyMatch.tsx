'use client'
import { EMatchStatus, EMatchType, TCandidateFull, TMatchStatus } from "@/shared/types";
import { FC, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useMatchStatuses } from "@/providers/MatchStatusProvider";
import { TResume } from "@/shared/types/resume";
import { matchTypeDict } from "@/shared/dictionaries";
import SpinnerTwo from '@/assets/icons/spinner2.svg?rc'
import { useUpdateMatch } from "@/hooks/useUpdateMatch";
import CancelButton from "@/components/buttons/CancelButton";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EditButton from "@/components/buttons/EditButton";
import StatusBadge from "@/components/StatusBadge";
import { matchBadgeColors } from "@/shared/dictionaries/badgeColors";


// const badgeColors: { [key: string]: string } = {
//   [EMatchStatus.SCREENING]: 'ring-primary text-primary hover:text-white hover:bg-primary/70',
//   [EMatchStatus.SCORING]: 'ring-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/70',
//   [EMatchStatus.INTERVIEW]: 'ring-orange-500 text-orange-500 hover:text-white hover:bg-orange-500/70',
//   [EMatchStatus.REFUSAL]: 'ring-destructive text-destructive hover:text-white hover:bg-destructive/70',
//   [EMatchStatus.OFFER]: 'ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70',
//   default: 'ring-gray-400 text-gray-400 hover:text-white hover:bg-gray-400/70'
// } as const

type TProps = {
  matchId: number,
  type: EMatchType,
  status_id: TMatchStatus["id"]
  match_point: TCandidateFull["point"];
  match_summary: TCandidateFull["summary"];
  cv_summary: TResume["summary"];
}

const CandyMatch: FC<TProps> = ({
  matchId,
  type,
  status_id,
  match_point,
  match_summary,
  cv_summary,
}) => {
  const matchStatuses = useMatchStatuses()

  const { isUpdating, startMatchUpd } = useUpdateMatch(matchId)

  const initStatusId = String(status_id)

  const initStatusData = matchStatuses.find(status => String(status.id) === initStatusId)

  const [isEditing, setIsEditing] = useState(false)



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    startMatchUpd(formData, status_id)

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false)
  }

  // formRef is used to trigger submitting outside the form
  const formRef = useRef<HTMLFormElement>(null)
  const handleConfirm = () => {
    formRef.current?.requestSubmit()
  }

  return (
    <div className=" flex flex-col gap-6">
      <div className="relative">

        {/* edit, confirm, cancel btns and spinner */}
        <span className="absolute top-0 right-1/4 text-[0px]">
          {!isEditing && !isUpdating && <EditButton
            className="p-0.5 h-max aspect-square"
            isIconView={true}
            onClick={() => setIsEditing(true)}
          />}

          {isEditing && !isUpdating && <>
            <CancelButton onClick={handleCancel} />
            <ConfirmButton onClick={handleConfirm} />
          </>}

          {!isEditing && isUpdating && <SpinnerTwo className="fill-primary/70 w-4 inline-block" />}
        </span>

        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Мэтч
        </h2>
        <form onSubmit={handleSubmit} ref={formRef}>
          <table className=" text-sm text-muted-foreground table-auto">
            <tbody>
              <tr>
                <td >Тип:</td>
                <td className="px-4 py-1">
                  {matchTypeDict[type]}
                </td>
              </tr>
              <tr>
                <td >Статус:</td>
                <td className="px-4 py-1">
                  {isEditing
                    ? <Select
                      name="status_id"
                      defaultValue={initStatusId}
                    >
                      <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0 h-7" >
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
                    : <StatusBadge
                      className={cn(
                        initStatusData ? matchBadgeColors[initStatusData.key] : matchBadgeColors.default, 'py-[5px] px-2'
                      )}
                    >
                      {initStatusData?.name}
                    </StatusBadge>
                  }

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
        </form>
      </div>

      <div className="min-h-40">
        <h2 className="scroll-m-20 mb-3 text-lg font-semibold tracking-tight">
          Саммори по мэтчу
        </h2>
        <p className='text-muted-foreground text-sm'>
          {match_summary || 'Отсутствует'}
        </p>
      </div>

      <div className="min-h-40">
        <h2 className="scroll-m-20 mb-3 text-lg font-semibold tracking-tight">
          Саммори по резюме
        </h2>
        <p className='text-muted-foreground text-sm'>
          {cv_summary || 'Отсутствует'}
        </p>
      </div>
    </div>
  );
}

export default CandyMatch;