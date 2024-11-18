import clsx from "clsx";
import Input from "../../../../../common/components/custom-input";
import { useQuery } from "@apollo/client";
import { GET_COLORS } from "../../../../../../graphql/query/colors";
import { useEffect, useState } from "react";

const FormPrototype = () => {
  const { data: colorData, loading: fetchColorData } = useQuery(GET_COLORS);
  const [colorDataArray, setColorDataArray] = useState();
  const colors = colorData ? colorData.colors : [];
  useEffect(() => {
    if (colors.length > 0) {
      setColorDataArray(
        colors.map((color) => ({
          id: color.id,
          name: color.name,
          value: color.value,
        }))
      );
    }
  }, [colorData]);
  const primaryColor =
    colorData && colorDataArray
      ? colorDataArray.find((color) => color.name === "primary")
      : "";
  const secondaryColor =
    colorData && colorDataArray
      ? colorDataArray.find((color) => color.name === "secondary")
      : "";
  const thirdColor =
    colorData && colorDataArray
      ? colorDataArray.find((color) => color.name === "third")
      : "";
  console.log(primaryColor);
  return (
    <div
      style={{ backgroundColor: `${secondaryColor.value}` }}
      className="w-[70%] p-6 flex flex-col gap-2"
    >
      <div
        style={{ color: `${primaryColor.value}` }}
        className="flex flex-col gap-4 items-start py-8 px-6"
      >
        <h2 className="text-3xl font-pacifico font-bold">Anyway</h2>
        <div className="flex flex-col gap-2 items-start">
          <h2 className="text-xl font-semibold">Guest Registration Form</h2>
          <div className="text-left text-sm">
            Enter the details to get the{" "}
            <span className="font-bold">Lucky Draw Number</span>
          </div>
        </div>
      </div>
      <div
        style={{ color: `${primaryColor.value}` }}
        className="w-full bg-primary rounded-t-[2.25rem] px-6 pt-4 pb-8"
      >
        <form
          action=""
          className="w-full h-full flex flex-col items-center gap-6 pt-9 overflow-y-auto"
        >
          <Input
            type="text"
            label="Name"
            name="name"
            placeholder={"Please enter your name"}
            textColor={secondaryColor.value}
          />
          <Input
            type="tel"
            label="Phone Number"
            name="phone"
            placeholder={"Please enter your phone number"}
            textColor={secondaryColor.value}
          />
          <Input
            type="text"
            label="What is your favourite event theme?"
            name="theme"
            placeholder="Please enter your answer"
            textColor={secondaryColor.value}
          />
          <Input
            type="text"
            label="How did you hear about us?"
            name="aboutus"
            placeholder="Please enter your answer"
            textColor={secondaryColor.value}
          />
          <button
            disabled={true}
            style={{
              color: `${primaryColor.value}`,
              backgroundColor: `${secondaryColor.value}`,
            }}
            className={clsx(
              "rounded-md px-2 py-3 h-[3rem]  w-3/5 mt-3 font-bold"
            )}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default FormPrototype;
