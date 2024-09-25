import { IDayOfWeek } from "@/types/business";
import moment from "moment";

interface BusinessHours {
  dayOfWeek: IDayOfWeek[];
}

export const getBusinessStatus = (
  businessHours: BusinessHours
): [string, string] => {
  const now = moment();
  const currentDay = now.format("dddd").toLowerCase();
  const currentTime = now.format("HH:mm");

  if (!businessHours.dayOfWeek || businessHours.dayOfWeek.length === 0) {
    return ["Đóng cửa vĩnh viễn", ""];
  }

  const todaySchedule = businessHours.dayOfWeek.find(
    (day) => day.day === currentDay
  );

  if (!todaySchedule) {
    return ["Đóng cửa", getNextOpeningTime(businessHours, now)];
  }

  if (
    currentTime >= todaySchedule.openTime &&
    currentTime < todaySchedule.closeTime
  ) {
    const closingTime = moment(todaySchedule.closeTime, "HH:mm");
    const minutesUntilClose = closingTime.diff(now, "minutes");

    if (minutesUntilClose <= 30) {
      return [
        "Sắp đóng cửa",
        `Quán sẽ đóng vào lúc ${todaySchedule.closeTime}`,
      ];
    } else {
      return ["Đang mở cửa", `Quán sẽ đóng vào lúc ${todaySchedule.closeTime}`];
    }
  } else {
    return ["Đóng cửa", getNextOpeningTime(businessHours, now)];
  }
};

const getNextOpeningTime = (
  businessHours: BusinessHours,
  now: moment.Moment
): string => {
  const sortedDays = businessHours.dayOfWeek.sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  const currentDayIndex = sortedDays.findIndex(
    (day) => day.day === now.format("dddd").toLowerCase()
  );

  const vietnameseDays = {
    monday: "Thứ Hai",
    tuesday: "Thứ Ba",
    wednesday: "Thứ Tư",
    thursday: "Thứ Năm",
    friday: "Thứ Sáu",
    saturday: "Thứ Bảy",
    sunday: "Chủ Nhật",
  };

  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDayIndex + i) % 7;
    const nextDay = sortedDays[nextDayIndex];

    if (nextDay) {
      const nextOpeningTime = moment(nextDay.openTime, "HH:mm");
      const nextOpeningDateTime = now
        .clone()
        .add(i, "days")
        .set({
          hour: nextOpeningTime.get("hour"),
          minute: nextOpeningTime.get("minute"),
          second: 0,
          millisecond: 0,
        });

      if (nextOpeningDateTime.isAfter(now)) {
        const vietnameseDay =
          vietnameseDays[nextDay.day as keyof typeof vietnameseDays];
        return `Quán sẽ mở cửa vào lúc ${nextDay.openTime} (${vietnameseDay})`;
      }
    }
  }

  return "Không có thông tin mở cửa";
};
