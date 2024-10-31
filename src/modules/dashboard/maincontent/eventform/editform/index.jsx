import { useMutation, useQuery } from "@apollo/client";
import { AiOutlineLoading } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { GET_INPUT_FIELDS } from "../../../../../graphql/query/inputfields";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { DELETE_INPUT_FIELD_BY_ID, UPDATE_INPUT_FIELD_BY_ID } from "../../../../../graphql/mutation/inputfileds";
import CreateInput from "./createinput";

const FormCustomization = () => {
  const [isEditModes, setIsEditModes] = useState({});
  const [updatingInputId, setUpdatingInputId] = useState(null);
  const [deletingInputId, setDeletingInputId] = useState(null);

  const {
    data: inputData,
    loading: loadingInputData,
    refetch: refetchInputData,
  } = useQuery(GET_INPUT_FIELDS);
  const inputs = inputData ? inputData.input_fields : [];

  const [updateInputField] = useMutation(UPDATE_INPUT_FIELD_BY_ID, {
    onCompleted: () => {
      refetchInputData();
      setUpdatingInputId(null);
    },
  });

  const [deleteInputField,{loading:deleteInputLoading}] = useMutation(DELETE_INPUT_FIELD_BY_ID,{
    onCompleted:() => {
      refetchInputData();
      setDeletingInputId(null);
    }
  })

  const [inputDataArray, setInputDataArray] = useState();
  useEffect(() => {
    if (inputs.length > 0) {
      setInputDataArray(
        inputs.map((input) => ({
          id: input.id,
          name: input.name,
          question: input.question,
        }))
      );
    }
  }, [inputData]);

  const toggleEditMode = (id) => {
    setIsEditModes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleChangeQuestionValue = (id, newQuestion) => {
    setInputDataArray((prevArray) =>
      prevArray.map((input) =>
        input.id === id ? { ...input, question: newQuestion } : input
      )
    );
  };

  const handleChangeNameValue = (id, newName) => {
    setInputDataArray((prevArray) =>
      prevArray.map((input) =>
        input.id === id ? { ...input, name: newName } : input
      )
    );
  };

  const updateFormInput = async (id) => {
    const seletedInput = inputDataArray.find((input) => input.id === id);
    setUpdatingInputId(id);
    try {
      await updateInputField({
        variables: {
          id: seletedInput.id,
          name: seletedInput.name,
          question: seletedInput.question,
        },
      });
    } catch (error) {
      setUpdatingInputId(null);
      console.log("error updating input fields");
    }
  };

  const deleteFormInput = async(id) => {
    const seletedInput = inputDataArray.find((input) => input.id === id);
    setDeletingInputId(id);
    try {
      await deleteInputField({
        variables: {
          id: seletedInput.id,
        },
      });
    } catch (error) {
      setUpdatingInputId(null);
      console.log("error deleting input fields");
    }
  }

  return (
    <section className="w-full grid grid-cols-2">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full h-14 p-4 rounded text-left bg-secondary text-primary">
          <h2 className="font-semibold text-xl">Edit form input</h2>
        </div>
        <div className="w-full flex flex-col gap-2 pr-2">
          {inputDataArray &&
            inputDataArray.map((input) => (
              <div className="w-full flex flex-row items-center gap-3">
                <input
                  value={input.name}
                  onChange={(e) =>
                    handleChangeNameValue(input.id, e.target.value)
                  }
                  className={clsx(
                    "w-[10rem] border border-gray-700 p-2 rounded-md",
                    {
                      "border-none bg-transparent": !isEditModes[input.id],
                    }
                  )}
                  type="text"
                />
                <input
                  value={input.question}
                  onChange={(e) =>
                    handleChangeQuestionValue(input.id, e.target.value)
                  }
                  className={clsx(
                    "w-full border border-gray-700 p-2 rounded-md",
                    {
                      "border-none bg-transparent": !isEditModes[input.id],
                    }
                  )}
                  type="text"
                />
                <div
                  className="hover:cursor-pointer font-bold"
                  onClick={() => toggleEditMode(input.id)}
                >
                  {!isEditModes[input.id] ? (
                    "Edit"
                  ) : (
                    <div>
                      <AiOutlineClose />
                    </div>
                  )}
                </div>
                {isEditModes[input.id] && (
                  <div
                    className="hover:cursor-pointer font-bold"
                    onClick={() => updateFormInput(input.id)}
                  >
                    {updatingInputId === input.id ? (
                      <div>
                        <AiOutlineLoading className="animate-spin" />
                      </div>
                    ) : (
                      "Save"
                    )}
                  </div>
                )}
                  <div
                    className="hover:cursor-pointer font-bold text-red-500 w-16 flex items-center justify-center"
                    onClick={() => deleteFormInput(input.id)}
                  >
                    {deletingInputId === input.id ? (
                      <div>
                        <AiOutlineLoading className="animate-spin" />
                      </div>
                    ) : (
                      "Remove"
                    )}
                  </div>
              </div>
            ))}
        </div>
        <div className="mit-4 w-full">
          <CreateInput refetchInputData={refetchInputData}/>
        </div>
      </div>
      <div></div>
    </section>
  );
};
export default FormCustomization;
