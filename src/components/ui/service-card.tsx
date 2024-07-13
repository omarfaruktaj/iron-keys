import React from "react";
import { animated, useSpring } from "react-spring";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  const animation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    delay: 300,
  });

  return (
    <animated.div style={animation}>
      <Card className="shadow-md h-full transition-transform transform hover:scale-105">
        <CardHeader className="flex flex-col items-center text-center p-6">
          {icon}
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-gray-600">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </animated.div>
  );
}
