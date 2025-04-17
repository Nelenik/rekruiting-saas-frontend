import { SignInForm } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";
import { StyledTabsTrigger } from "./StyledTabsTrigger";
import { Tabs, TabsContent, TabsList } from "@/shared/ui/shadcn/tabs";

export const AuthTabs = () => {
  return (
    <Tabs defaultValue="signin" className="w-[min(100%,_400px)] ">
      <TabsList className="grid w-full grid-cols-2 bg-white h-auto p-2">
        <StyledTabsTrigger value="signin">
          Авторизоваться
        </StyledTabsTrigger>
        <StyledTabsTrigger value="signup">
          Зарегистрироваться
        </StyledTabsTrigger>
      </TabsList>
      <TabsContent value="signin" className="min-h-[350px] shadow-2xl">
        <Card className="min-h-[350px]">
          <CardHeader>
            <CardTitle>
              Авторизоваться
            </CardTitle>
          </CardHeader>
          <CardContent >
            <SignInForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup" className="min-h-[350px] shadow-2xl">
        <Card className="min-h-[350px]">
          <CardContent>

          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}