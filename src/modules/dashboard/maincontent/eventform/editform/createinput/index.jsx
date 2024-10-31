import { useForm } from "react-hook-form";
import Input from "../../../../../common/components/custom-input";
import { useMutation } from "@apollo/client";
import { CREATE_INPUT_FIELD } from "../../../../../../graphql/mutation/inputfileds";
import { VscLoading } from "react-icons/vsc";

const CreateInput = ({ refetchInputData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createInput, { loading: createInputLoading }] = useMutation(
    CREATE_INPUT_FIELD,
    {
      onCompleted: () => {
        refetchInputData();
      },
    }
  );

  const handleCreateInput = handleSubmit(async (credentials) => {
    try {
      await createInput({
        variables: {
          name: credentials.name,
          question: credentials.question,
        },
      });
    } catch (error) {
      console.log("error creating input fields", error);
    }
  });
  return (
    <div className="w-full">
      <form onSubmit={handleCreateInput} action="" className="w-full flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="text"
            label="Key"
            name="name"
            placeholder={errors.name ? "Invalid" : "Please enter key name"}
            {...register("name", { required: "Name is required" })}
          />
          <Input
            type="text"
            label="Question"
            name="question"
            placeholder={errors.question ? "Invalid" : "Please enter question"}
            {...register("question", { required: "Question is required" })}
          />
        </div>
        <div className="w-full flex flex-row items-center justify-end">
          <button disabled={createInputLoading} type="submit" className="w-[8rem] p-3 rounded-md border bg-green-600 text-primary flex flex-row items-center justify-center">
            {createInputLoading ? (
              <div className="w-full h-full border-none flex items-center justify-center">
                <VscLoading color="black" className="animate-spin" />
              </div>
            ) : (
              "Add question"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateInput;
