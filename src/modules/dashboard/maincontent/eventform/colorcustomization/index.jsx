import { useMutation, useQuery } from "@apollo/client";
import { GET_COLORS } from "../../../../../graphql/query/colors";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { UPDATE_COLOR_BY_ID } from "../../../../../graphql/mutation/color";

const ColorCustomization = () => {
  const [isEditModes, setIsEditModes] = useState({});
  const [updatingColorId, setUpdatingColorId] = useState(null)

  const {
    data: colorData,
    loading: loadingColors,
    refetch: refetchColor,
  } = useQuery(GET_COLORS);
  const colors = colorData ? colorData.colors : [];
  const [updateColor, { loading: updateColorLoading }] = useMutation(
    UPDATE_COLOR_BY_ID,
    {
      onCompleted: () => {
        refetchColor();
        setUpdatingColorId(null);
      },
    }
  );

  const [colorDataArray, setColorDataArray] = useState();

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

  console.log(colorDataArray);

  const toggleEditMode = (id) => {
    setIsEditModes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleChangeColorValue = (id, newValue) => {
    setColorDataArray((prevArray) =>
      prevArray.map((color) =>
        color.id === id ? { ...color, value: newValue } : color
      )
    );
  };

  const updateColorValue = async (id) => {
    const selectedColor = colorDataArray.find((color) => color.id === id);
    setUpdatingColorId(id);
    try {
      await updateColor({
        variables: {
          id: selectedColor.id,
          name: selectedColor.name,
          value: selectedColor.value,
        },
      });
    } catch (error) {
      console.log("error updating color");
      setUpdatingColorId(null);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {colorDataArray &&
        colorDataArray.map((color) => (
          <div
            key={color.id}
            className="w-full flex flex-row gap-3 items-center justify-start"
          >
            <h2 className="w-20 text-left font-semibold">{color.name}</h2>
            <div className="flex flex-row items-center gap-3">
              <input
                value={color.value}
                onChange={(e) =>
                  handleChangeColorValue(color.id, e.target.value)
                }
                className={clsx("w-28 border border-gray-700 p-2 rounded-md", {
                  "border-none bg-transparent": !isEditModes[color.id],
                })}
                type="text"
              />
              <div
                style={{ backgroundColor: `${color.value}` }}
                className="w-20 h-10 rounded-md border"
              ></div>
              <div
                className="hover:cursor-pointer"
                onClick={() => toggleEditMode(color.id)}
              >
                {!isEditModes[color.id] ? (
                  "Edit"
                ) : (
                  <div>
                    <AiOutlineClose />
                  </div>
                )}
              </div>
              {isEditModes[color.id] && (
                <div
                  className="hover:cursor-pointer"
                  onClick={() => updateColorValue(color.id)}
                >
                  {updatingColorId === color.id ? (
                    <div>
                      <AiOutlineLoading className="animate-spin" />
                    </div>
                  ) : (
                    "Save"
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
export default ColorCustomization;
