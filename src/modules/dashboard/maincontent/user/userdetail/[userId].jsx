import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_SURVEY_DATA_BY_ID } from "../../../../../graphql/query/survey";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {data:userData,loading:userDataLoading} = useQuery(GET_SURVEY_DATA_BY_ID,{
    variables: {id:id}
  });
  const user = userData && userData.survey_data.length > 0? userData.survey_data[0]:[];
  console.log(user.theme)
  if(userDataLoading) return <div className="w-full h-[50vh] flex items-center justify-center">Loading...</div>
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full flex flex-col items-center justify-start gap-2">
      <div className="lg:w-[30vw] md:min-w-[60vw] w-full p-3 bg-secondary rounded flex items-center justify-start">
        <div
        onClick={() => navigate('/dashboard')}
        className="text-primary hover:cursor-pointer">Back</div>
      </div>
        <div className="lg:w-[30vw] md:min-w-[60vw] w-full p-4 border flex flex-col bg-white shadow rounded gap-4">         
          <div className="w-full h-full grid grid-cols-6">
            <div className="col-span-2 p-2 h-full flex flex-col text-left border-r gap-4">
              <div className="w-full flex flex-col gap-2">
                <div>
                  <h2 className="font-bold text-lg">Name</h2>
                </div>
                <div>
                  <h2 className="font-semibold text-lg pl-4 text-secondary">{user.name}</h2>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div>
                  <h2 className="font-bold text-lg">Phone</h2>
                </div>
                <div>
                  <h2 className="font-semibold text-lg pl-4 text-secondary">{user.phone}</h2>
                </div>
              </div>
            </div>
            <div className="col-span-4 p-2 text-left">
                <div className="w-full h-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="font-semibold">Favourite Theme</h2>
                        <p className="pl-4">{user.theme ? user.theme:(<span className="text-light text-gray-400">User decided not to fill this data</span>)}</p>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="font-semibold ">Why interested us</h2>
                        <p className="pl-4">{user.aboutus ? user.aboutus:(<span className="text-light text-gray-400">User decided not to fill this data</span>)}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
