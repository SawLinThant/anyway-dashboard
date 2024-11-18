import { useForm } from "react-hook-form";
import Input from "../../../../../common/components/custom-input";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_INPUT_FIELD,
  UPDATE_INPUT_FIELD_BY_ID,
} from "../../../../../../graphql/mutation/inputfileds";
import { VscLoading } from "react-icons/vsc";
import { UPDATE_EVENT_BY_NAME } from "../../../../../../graphql/mutation/event";
import { GET_EVENT_BY_NAME } from "../../../../../../graphql/query/event";
import { useEffect, useState } from "react";

const EditEvent = ({ refetchEventtData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: eventData,
    loading: loadingEvent,
    refetch: refetchEvent,
  } = useQuery(GET_EVENT_BY_NAME,{
    variables:{name:'Guest Registration Form'}
  });
  const event = eventData ? eventData.event : [];
  const [eventInfo, setEventInfo] = useState();
  useEffect(() => {
    if (event.length > 0) {
        setEventInfo({
        name: event.name,
        company: event.company,
        description: event.description
      });
    }
  }, [eventData]);
  console.log(eventInfo)

  const [updateEvent, { loading: updateEventLoading }] = useMutation(
    UPDATE_EVENT_BY_NAME,
    {
      onCompleted: () => {
        refetchInputData();
      },
    }
  );

  const handleupdateEvent = handleSubmit(async (credentials) => {
    try {
      await updateEvent({
        variables: {
          name: credentials.name,
          question: credentials.company,
        },
      });
    } catch (error) {
      console.log("error creating input fields", error);
    }
  });
  return (
    <div className="w-full">
      <form
        onSubmit={handleupdateEvent}
        action=""
        className="w-full flex flex-col gap-4"
      >
          <Input
            type="text"
            label="Company"
            name="company"
            placeholder={errors.company ? "Invalid" : "Please enter key name"}
            {...register("company", { required: "Company is required" })}
          />
          <Input
            type="text"
            label="Description"
            name="description"
            placeholder={
              errors.description ? "Invalid" : "Please enter question"
            }
            {...register("description", {
              required: "Description is required",
            })}
          />
       
        <div className="w-full flex flex-row items-center justify-end">
          <button
            disabled={updateEventLoading}
            type="submit"
            className="w-[8rem] p-3 rounded-md border bg-green-600 text-primary flex flex-row items-center justify-center"
          >
            {updateEventLoading ? (
              <div className="w-full h-full border-none flex items-center justify-center">
                <VscLoading color="black" className="animate-spin" />
              </div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditEvent;
