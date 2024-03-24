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

const defaultValues: Partial<ProfileFormValues> = {};

interface CheckoutFormProps {
  session: Session | null;
  peru: UbigeoInterface;
}

import { useState } from "react";

export function SelectUbigeo({ peru, session }: CheckoutFormProps) {
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>("");
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [distritos, setDistritos] = useState<Distrito[]>([]);

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

        <Button type="submit">Continuar</Button>
      </form>
    </Form>
  );
}
