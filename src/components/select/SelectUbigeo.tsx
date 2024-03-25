"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Departamento,
  Distrito,
  Provincia,
  UbigeoInterface,
} from "@/models/ubigeo.model";
import { Session } from "next-auth";

const profileFormSchema = z.object({
  name: z
    .string({
      required_error: "Requiere un nombre.",
    })
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    })
    .max(30, {
      message: "El nombre no debe tener más de 30 caracteres..",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  departamento: z.string({
    required_error: "Seleccione un departamento para mostrar.",
  }),
  provincia: z.string({
    required_error: "Seleccione una provincia para mostrar.",
  }),
  distrito: z.string({
    required_error: "Seleccione un distrito.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface CheckoutFormProps {
  session: Session | null;
  peru: UbigeoInterface;
}

import { useState } from "react";
import { Input } from "../ui/input";

export function SelectUbigeo({ peru, session }: CheckoutFormProps) {
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>("");
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [distritos, setDistritos] = useState<Distrito[]>([]);

  const defaultValues: Partial<ProfileFormValues> = {
    email: session?.user.email,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const handleDepartamentoChange = (departamentoId: string) => {
    setSelectedDepartamento(departamentoId);
    const selectedDepartamentoData = peru[departamentoId];
    if (selectedDepartamentoData) {
      setProvincias(selectedDepartamentoData.provincias);
      setSelectedProvincia("");
      setDistritos([]);
    }
  };

  const handleProvinciaChange = (provinciaId: string) => {
    setSelectedProvincia(provinciaId);
    const selectedProvinciaData = provincias.find(
      (provincia) => provincia.provincia_id === provinciaId
    );
    if (selectedProvinciaData) {
      setDistritos(selectedProvinciaData.distritos);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón Social *</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Razón Social de su representada; en caso de ser a nombre de
                persona natural favor de indicarnos su número de DNI y la
                dirección de su domicilio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormDescription>
                You can manage verified email addresses in your.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                        <SelectItem key={departamentoId} value={departamentoId}>
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
          <div className="col-span-1">
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
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="distrito"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distrito *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
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

        <Button type="submit">Continuar</Button>
      </form>
    </Form>
  );
}
