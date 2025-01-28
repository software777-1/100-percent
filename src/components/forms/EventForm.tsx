"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  eventSchema,
  EventSchema,
  StudentSchema,
} from "@/lib/formValidationSchemas";
import {
  createEvent,
  createSubject,
  updateEvent,
  updateSubject,
} from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EventForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createEvent : updateEvent,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold text-white">
        {type === "create" ? "Create a new event" : "Update the event"}
      </h1>

      <div className="flex flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
        <div className="w-full md:w-1/2">
          <label className="text-xs text-gray-500">Start Time</label>
          <input
            type="datetime-local"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("startTime")}
            defaultValue={data?.startTime}
          />
          {errors.startTime?.message && (
            <p className="text-xs text-red-400">
              {errors.startTime.message.toString()}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <label className="text-xs text-gray-500">End Time</label>
          <input
            type="datetime-local"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("endTime")}
            defaultValue={data?.endTime}
          />
          {errors.endTime?.message && (
            <p className="text-xs text-red-400">
              {errors.endTime.message.toString()}
            </p>
          )}
        </div>
      </div>

      <button className="bg-customPurple text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default EventForm;
