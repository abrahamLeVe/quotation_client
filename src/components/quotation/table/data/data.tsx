import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  ClockIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "Descargar comprobante",
    label: "Descargar comprobante",
  },
];

export const statuses = [
  {
    value: "Cancelada",
    label: "Cancelada",
    icon: CrossCircledIcon,
  },
  {
    value: "Cerrada",
    label: "Cerrada",
    icon: CircleIcon,
  },
  {
    value: "Completada",
    label: "Completada",
    icon: CheckCircledIcon,
  },
  {
    value: "En progreso",
    label: "En progreso",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Vencido",
    label: "Vencido",
    icon: StopwatchIcon,
  },
  {
    value: "Pago pendiente",
    label: "Pago pendiente",
    icon: ClockIcon,
  },
];
