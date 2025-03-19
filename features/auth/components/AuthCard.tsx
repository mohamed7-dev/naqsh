import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type AuthCardProps = {
  cardTitle: string;
  cardDescription: string;
  children: React.ReactNode;
  Footer?: React.ReactNode;
};
function AuthCard(props: AuthCardProps) {
  const { cardTitle, cardDescription, children, Footer } = props;
  return (
    <Card className="w-full shadow-none md:shadow-sm">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{Footer}</CardFooter>
    </Card>
  );
}

export { AuthCard };
