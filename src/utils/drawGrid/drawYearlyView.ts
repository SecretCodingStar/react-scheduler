import dayjs from "dayjs";
import { boxHeight, headerHeight, singleDayWidth, weekWidth } from "@/constants";
import { Day } from "@/types/global";
import { drawDashedLine } from "../drawDashedLine";
import { getDaysInMonths } from "../dates";
import { drawCell } from "./drawCell";

export const drawYearlyView = (
  ctx: CanvasRenderingContext2D,
  rows: number,
  cols: number,
  startDate: Day
) => {
  let xPos = 0;
  let startPos = -(startDate.dayOfMonth - 1) * singleDayWidth;

  for (let i = 0; i <= cols; i++) {
    const week = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
      i,
      "weeks"
    );

    const isCurrWeek = week.isSame(dayjs(), "week");

    for (let y = 0; y <= rows; y++) {
      drawCell(ctx, xPos, y * boxHeight, weekWidth, true, isCurrWeek);
    }

    xPos += weekWidth;
  }

  for (let i = 0; i < cols; i++) {
    const width = getDaysInMonths(startDate, i) * singleDayWidth;
    drawDashedLine(ctx, startPos, rows * boxHeight + headerHeight);
    startPos += width;
  }
};
