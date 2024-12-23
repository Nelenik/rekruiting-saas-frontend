import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

interface IFunnelCard {
  name: string
  count: number
}
const FunnelCard = ({ name, count }: IFunnelCard) => {
  return (
    <Card className="w-full min-w-[240px] py-4 px-6 flex flex-col items-center">
      <CardTitle className="mb text-lg lg:text-2xl">{name}</CardTitle>
      <CardDescription>{count}</CardDescription>
    </Card>
  );
}

export default FunnelCard;