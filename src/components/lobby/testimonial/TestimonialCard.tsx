"use client";
import { ContacDataInterface } from "@/models/contact.model";
import {
  capitalizeFirstLetter,
  capitalizeWords,
  formatDate,
} from "@/utilities/utils";
import ProductRating from "../../product/ProductRating";
import { Badge } from "../../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

interface TestimonialCarrouselProps {
  contact: ContacDataInterface;
}

export default function TestimonialCard(contact: TestimonialCarrouselProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          {capitalizeFirstLetter(contact.contact.attributes.title)}
          <Badge className="ml-1">Cliente</Badge>
        </CardTitle>
        <CardDescription>
          {formatDate(contact.contact.attributes.createdAt)}
        </CardDescription>
        <ProductRating
          rating={contact.contact.attributes.rating}
          rating_count={0}
        />
      </CardHeader>
      <CardContent>{contact.contact.attributes.message} </CardContent>
      <CardFooter>
        {capitalizeWords(contact.contact.attributes.name)}
      </CardFooter>
    </Card>
  );
}
