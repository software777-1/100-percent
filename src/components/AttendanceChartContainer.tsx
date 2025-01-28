import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";

const getLastMonday = (date) => {
  const dayOfWeek = date.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(date);
  lastMonday.setDate(date.getDate() - daysSinceMonday);
  return lastMonday;
};

const initializeAttendanceMap = (days) => {
  return days.reduce((map, day) => {
    map[day] = { present: 0, absent: 0 };
    return map;
  }, {});
};

const processAttendanceData = (resData, daysOfWeek) => {
  const attendanceMap = initializeAttendanceMap(daysOfWeek);

  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayOfWeek = itemDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];
      attendanceMap[dayName].present += item.present ? 1 : 0;
      attendanceMap[dayName].absent += item.present ? 0 : 1;
    }
  });

  return daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));
};

const AttendanceChartContainer = async () => {
  const today = new Date();
  const lastMonday = getLastMonday(today);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const data = processAttendanceData(resData, daysOfWeek);

  return (
    <div className="bg-customDark rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-customWhite">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;


  return (
    <div className="bg-customDark rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-customWhite">
          Attendance
        </h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
