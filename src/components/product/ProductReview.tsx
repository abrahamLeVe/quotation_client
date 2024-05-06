"use client";
import { postReviewProduct } from "@/app/services/review.service";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ReviewFormValues,
  reviewFormSchema,
} from "@/lib/validations/formReview";
import { ReviewsInterface } from "@/models/review.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icons } from "../Icons";
import StarRating from "../contact/ContactStar";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import ProductSimpleRating from "./ProductSingleRting";
interface ProductReviesProps {
  reviews: ReviewsInterface;
  productId: number;
}

export default function ProductReview({
  reviews,
  productId,
}: ProductReviesProps) {
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const userHasReviewed = reviews.data.some(
    (review) => review.attributes.user.data.id === session?.user.userId
  );

  const defaultValues: Partial<ReviewFormValues> = {
    message: "",
    rating: 0,
  };

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ReviewFormValues) {
    setIsPending(true);

    try {
      const dataApi = {
        data: {
          message: data.message,
          rating: Number(data.rating),
          user: {
            id: session?.user.userId,
          },
          product: { id: productId },
        },
      };

      const res = await postReviewProduct(dataApi);

      if (res.data === null && res.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.error.message,
        });
        setIsPending(false);
      } else {
        router.refresh();
        toast({
          variant: "default",
          title: "Éxito",
          description:
            "Su mensaje fue enviado con éxito, revise su correo electrónico para mas información.",
        });
      }
    } catch (error) {
      console.log("error contact form ", error);
    }
  }
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg">Reseñas</AccordionTrigger>
        <AccordionContent>
          {session && !userHasReviewed ? (
            <Card className="mb-5">
              <CardHeader>
                <CardTitle>Valore este producto</CardTitle>
                {/* <CardDescription>
                Deploy your new project in one-click.
              </CardDescription> */}
              </CardHeader>
              <CardContent>
                <div>
                  <Form {...form}>
                    <form
                      className="grid gap-4"
                      onSubmit={(...args) =>
                        void form.handleSubmit(onSubmit)(...args)
                      }
                    >
                      {/* message */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensaje *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Escribe tu mensaje aquí."
                                {...field}
                                className="resize-none"
                              />
                            </FormControl>
                            {/* <FormDescription>
                              Su mensaje para este producto.
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* rating */}
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valoración *</FormLabel>
                            <FormControl>
                              <StarRating
                                totalStars={5}
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button disabled={isPending}>
                        {isPending && (
                          <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                          />
                        )}
                        Valorar
                        <span className="sr-only">Valorar</span>
                      </Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
            </Card>
          ) : (
            <></>
          )}
          {reviews.data.length > 0 ? (
            <>
              {reviews.data.map((review) => (
                <Card key={review.id} className="mb-5">
                  <CardHeader>
                    <div className="flex gap-2 items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {review.attributes.user.data.attributes.username
                            .charAt(0)
                            .toUpperCase() ?? ""}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle>
                        {review.attributes.user.data.attributes.username}
                      </CardTitle>
                      <ProductSimpleRating rating={review.attributes.rating} />
                    </div>
                    <CardDescription>
                      {review.attributes.message}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </>
          ) : (
            <>
              {!session ? (
                <>
                  <Alert variant="default">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Sin valoración</AlertTitle>
                    <AlertDescription>
                      <div className="flex flex-col gap-3">
                        <p>Sé el/la primer@ en valorar este producto.</p>
                        <span className="underline">
                          <Link href={"/auth/signin"}>Ingresar click Aquí</Link>
                        </span>
                      </div>
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
