import dayjs from "dayjs";
import { dateFormat } from "../constants/common";

export type TDate = string | number | Date | dayjs.Dayjs | null | undefined;
export type TParseDate = dayjs.Dayjs;

export const today = dayjs();

const currentMonth = dayjs().month();
const currentYear = dayjs().year();

export const isCurrentMonth = (date: string) => currentMonth === dayjs(date).month() && currentYear === dayjs(date).year();
export const parseDate = (date: TDate, format?: dayjs.OptionType): TParseDate => dayjs(date, format ?? dateFormat);

export const convertDateToString = (date: TDate): string => dayjs(date).format(dateFormat);

export const isExpiresThisMonth = (date: string) => isCurrentMonth(date) && dayjs(date) > today;
