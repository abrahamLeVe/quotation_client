"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { postContactMessage } from "@/app/services/contact.service";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  ContactFormValues,
  contactFormSchema,
} from "@/lib/validations/formContact";
import { ContactTypeInterface } from "@/models/contact.model";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../Icons";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import StarRating from "./ContactStar";

interface ContactButtonProps {
  contacts: ContactTypeInterface[];
}

export function ContactForm({ contacts }: ContactButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const defaultValues: Partial<ContactFormValues> = {
    typeContact: undefined,
    email: "",
    name: "",
    phone: "",
    title: "",
    rating: "0",
  };
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);

    try {
      const dataApi = {
        data: {
          ...data,
          contact_type: {
            id: Number(data.typeContact),
          },
          rating: Number(data.rating),
        },
      };

      const res = await postContactMessage(dataApi);

      if (res.data === null && res.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Hubo un error al enviar su mensaje, intentelo mas tarde",
        });
      } else {
        router.push("/");

        toast({
          variant: "default",
          title: "Éxito",
          description:
            "Su mensaje fue enviado con éxito, revise su correo electrónico para mas información.",
        });
      }
    } catch (error) {
      console.log("error contact form ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card
      className={`max-w-3xl w-full mb-16 ${
        isLoading && "pointer-events-none"
      } `}
    >
      <CardHeader>
        <CardTitle>Contáctenos</CardTitle>
        <CardDescription>
          Su opinión en muy importante para nuestro nosotros.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="typeContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo *</FormLabel>
                  <Select
                    name="typeContact"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el motivo de este mensaje" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contacts.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.attributes.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre y apellidos*</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="name" />
                    </FormControl>
                    <FormDescription>
                      Primer nombre y apellidos *
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su correo electrónico"
                        value={field.value || ""}
                        onChange={field.onChange}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono de contacto *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="666 666 666"
                        {...field}
                        type="number"
                        autoComplete="tel"
                      />
                    </FormControl>
                    <FormDescription>
                      Indíquenos el número celular de contacto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título *</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormDescription>
                      Un título para este mensaje
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                  <FormDescription>
                    Su mensaje es muy importante para nosotros.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={`${field.name}-1`}>
                    Valoración (opcional)
                  </FormLabel>
                  <FormControl>
                    <StarRating
                      idPrefix={field.name}
                      totalStars={5}
                      value={Number(field.value)}
                      onChange={(value) => field.onChange(value.toString())}
                    />
                  </FormControl>
                  <FormDescription>
                    Su valoración para esta tienda virtual.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-end">
              <Button variant="outline" type="submit">
                {isLoading && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Enviar mensaje
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
