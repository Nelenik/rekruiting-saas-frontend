import List from "@/components/ui/list";
import { TResume } from "@/shared/types/resume";
import { Dot } from "lucide-react";
import { FC } from "react";

type TProps = {
  experience: TResume['experience']
}

const CandyExperience: FC<TProps> = ({ experience }) => {
  return (
    <List className='columns-1 sm:columns-2 min-h-[80vh] gap-6'>
      {Array.from({ length: 6 }, (_, i) => (
        <li key={i} className="bg-indigo-100 py-3 px-6 rounded-lg flex flex-col gap-2 [&:not(:last-child)]:mb-6">
          <p className='flex gap-2 items-center'>
            <span className='text-blue-700'> Яндекс</span>
            <Dot />
            <span>менеджер по продажам</span>

          </p>
          <p className='text-muted-foreground'>январь 2019 - январь 2024</p>
          <p className='text-muted-foreground'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus eius quis, ducimus consequatur, placeat consectetur doloremque consequuntur illum aperiam ullam, voluptates provident. Error, vel asperiores. Sit ducimus labore dolores dicta.
          </p>
        </li>
      ))}
    </List>
  );
}

export default CandyExperience;