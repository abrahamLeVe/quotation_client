"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Distrito, Provincia, UbigeoInterface } from "@/models/ubigeo.model";
import { Session } from "next-auth";

import { createQuotation } from "@/app/services/quotation.service";
import { useCartContext } from "@/context/cart.context";
import {
  ProfileFormValues,
  dataQuotationFormSchema,
} from "@/lib/validations/formDataQuotation";
import { cartStore } from "@/store/cart.store";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../Icons";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const EmptyCartMessage = dynamic(
  () => import("../cart/message/EmptyCartMessage"),
  {
    ssr: false,
  }
);

interface CheckoutFormProps {
  session: Session | null;
  peru: UbigeoInterface;
}

export function CheckoutForm({ peru, session }: CheckoutFormProps) {
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>("");
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [distritos, setDistritos] = useState<Distrito[]>([]);
  const { setIsLoading, isLoading } = useCartContext();
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const cart = cartStore((state) => state.clearCart);
  const products = cartStore((state) => state.cartItemState);
  const router = useRouter();

  const defaultValues: Partial<ProfileFormValues> = {
    email: session?.user.email,
    name: "",
    tipe_doc: undefined,
    direction: "",
    phone: "",
    num_doc: "",
    departamento: undefined,
    provincia: undefined,
    distrito: undefined,
    details: undefined,
    location: {
      departamento: "",
      provincia: "",
      distrito: "",
    },
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(dataQuotationFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    setIsEnable(false);

    const res = await createQuotation({ products, dataQuotation: data });

    if (res.data === null && res.error) {
      toast({
        variant: "destructive",
        title: res.error.message,
        description: (
          <div className="flex flex-col gap-3">
            <span>{res.error.details}</span>
          </div>
        ),
      });
      setIsLoading(false);
      setIsEnable(true);
    } else {
      toast({
        variant: "default",
        title: "Éxito",
        description:
          "Cotización enviada con éxito, revise su correo para mas información, gracias por su preferencia.",
      });
      router.push("/dashboard/order");
      router.refresh();
      cart();
      setIsLoading(false);
    }
  }

  const handleDepartamentoChange = (departamentoId: string) => {
    setSelectedDepartamento(departamentoId);
    const selectedDepartamentoData = peru[departamentoId];
    if (selectedDepartamentoData) {
      setProvincias(selectedDepartamentoData.provincias);
      setSelectedProvincia("");
      setDistritos([]);
      form.setValue("location", {
        ...form.getValues("location"),
        departamento: selectedDepartamentoData.departamento,
      });
      form.setValue("provincia", "");
      form.setValue("distrito", "");
    }
  };

  const handleProvinciaChange = (provinciaId: string) => {
    setSelectedProvincia(provinciaId);
    const selectedProvinciaData = provincias.find(
      (provincia) => provincia.provincia_id === provinciaId
    );
    if (selectedProvinciaData) {
      setDistritos(selectedProvinciaData.distritos);
      form.setValue("location", {
        ...form.getValues("location"),
        provincia: selectedProvinciaData.provincia,
        distrito: "",
      });
    }
  };

  const handleDistritoChange = (distritoId: string) => {
    const selectedDistrito = distritos.find(
      (distrito) => distrito.distrito_id === distritoId
    );

    if (selectedDistrito) {
      form.setValue("location", {
        ...form.getValues("location"),
        distrito: selectedDistrito?.distrito,
      });
    }
  };

  if (session === null || products.length === 0) {
    return (
      <EmptyCartMessage
        title="Carrito vacío o no tiene una cuenta registrada"
        description="Explore nuestros productos y/o registrese para controlar sus pedidos."
      />
    );
  } else {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // className={`space-y-8 ${!isEnable && "pointer-events-none"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razón Social *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Razón Social de su representada; en caso de ser a nombre
                      de persona natural favor de indicarnos su número de DNI y
                      la dirección de su domicilio.
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={session?.user.email!}>
                          {session?.user.email}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="tipe_doc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de documento *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo de documento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dni">DNI</SelectItem>
                        <SelectItem value="ruc">RUC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="direction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="num_doc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de documento *</FormLabel>
                    <FormControl>
                      <Input placeholder="DNI o RUC" {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                      Nombre de persona natural favor de indicarnos su número de
                      DNI.
                    </FormDescription>
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
                        placeholder="Número telefónico"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    {/* <FormDescription>
                      Nombre de persona natural favor de indicarnos su número de
                      DNI.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="departamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleDepartamentoChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Elegir departamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(peru).map((departamentoId) => (
                          <SelectItem
                            key={departamentoId}
                            value={departamentoId}
                          >
                            {peru[departamentoId].departamento}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Seleccione un departamento para poder elegir una provincia
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1" key={provincias.length}>
              <FormField
                control={form.control}
                name="provincia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provincia *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleProvinciaChange(value);
                      }}
                      defaultValue={field.value}
                      disabled={!selectedDepartamento}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Elegir provincia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provincias.map((provincia) => (
                          <SelectItem
                            key={provincia.provincia_id}
                            value={provincia.provincia_id}
                          >
                            {provincia.provincia}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Seleccione una provincia para poder elegir un distrito
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1" key={selectedProvincia}>
              <FormField
                control={form.control}
                name="distrito"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distrito *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleDistritoChange(value);
                      }}
                      defaultValue={field.value}
                      disabled={!selectedProvincia}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Elegir distrito" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {distritos.map((distrito) => (
                          <SelectItem
                            key={distrito.distrito_id}
                            value={distrito.distrito_id}
                          >
                            {distrito.distrito}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Seleccione un distrito</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe tu mensaje aquí."
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription>
                  Tus comentarios por esta cotización.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex">
            <Button className="ml-auto" variant={"outline"} type="submit">
              {isLoading && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Enviar cotización
              <span className="sr-only">Enviar cotización</span>
            </Button>
          </div>
        </form>
      </Form>
    );
  }
}
