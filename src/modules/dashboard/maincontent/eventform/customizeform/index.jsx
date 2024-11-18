import { useMutation, useQuery } from "@apollo/client";
import { GET_EVENT_THEME } from "../../../../../graphql/query/theme";
import { useEffect, useState } from "react";
import Tag from "../../../../common/components/customtag";
import {
  CREATE_THEME,
  DELETE_THEME,
} from "../../../../../graphql/mutation/theme";
import { useForm } from "react-hook-form";
import { VscLoading } from "react-icons/vsc";
import ColorCustomization from "../colorcustomization";
import FormCustomization from "../editform";
import EditEvent from "../editform/edittitle";

const CustomizeForm = () => {
  const [theme, setTheme] = useState();

  //get theme
  const {
    data: themeData,
    loading: fetchTheme,
    refetch: refetchTheme,
  } = useQuery(GET_EVENT_THEME);

  //create theme for select
  const [createTheme, { loading: createThemeLoading }] = useMutation(
    CREATE_THEME,
    {
      onCompleted: () => {
        refetchTheme();
      },
    }
  );
  const { register: themeRegister, handleSubmit: handleCreateThemeSubmit } =
    useForm();
  const handleCreateTheme = handleCreateThemeSubmit(async (credentials) => {
    try {
      createTheme({
        variables: {
          name: credentials.name,
        },
      });
    } catch (error) {
      console.log("error creating theme");
    }
  });

  //delete tag
  const [deleteTheme] = useMutation(DELETE_THEME, {
    onCompleted: () => {
      refetchTheme();
    },
  });
  const deleteTag = async (id) => {
    try {
      await deleteTheme({
        variables: {
          id: id,
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (themeData && themeData.event_themes) {
      setTheme(themeData.event_themes);
    }
  }, [themeData]);
  return (
    <section className="w-full h-full flex flex-col gap-8 overflow-y-auto">
      <div className="w-full grid grid-cols-2">
        <div className="w-full px-4 border-r border-gray-500">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full h-14 p-4 rounded text-left bg-secondary text-primary">
              <h2 className="font-semibold text-xl">Event Info</h2>
            </div>
            <div className="mt-4 w-full">
              <EditEvent />
            </div>
            <h2 className="font-semibold text-xl text-left">
                Event Themes
              </h2>
            <div className="w-full flex flex-col items-end gap-2">
              <input
                name="name"
                {...themeRegister("name", {
                  required: "Name is required",
                })}
                className="w-full h-full p-2 rounded-md border border-gray-600"
                placeholder="Add theme"
                type="text"
              />
              <button
                onClick={handleCreateTheme}
                className="bg-green-600 w-[8rem] text-primary flex items-center justify-center p-3"
              >
                {createThemeLoading ? (
                  <div className="w-full h-full border-none flex items-center justify-center">
                    <VscLoading color="white" className="animate-spin" />
                  </div>
                ) : (
                  "Add"
                )}
              </button>
            </div>
            <div className="w-full flex flex-col pb-4">
              <div className="w-full flex flex-wrap gap-2 p-4">
                {theme &&
                  theme.map((theme) => (
                    <Tag
                      deleteTag={() => deleteTag(theme.id)}
                      key={theme.id}
                      name={theme.name}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full h-14 p-4 rounded text-left bg-secondary text-primary">
              <h2 className="font-semibold text-xl">Form Color</h2>
            </div>
            <ColorCustomization />
          </div>
        </div>
      </div>
      <div className="w-full">
        <FormCustomization />
      </div>
    </section>
  );
};
export default CustomizeForm;
