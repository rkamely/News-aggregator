import {useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {getSingleItemNews} from "../../apis/apis.ts";
import Title from "../../components/titles/Title.tsx";
import PostBody from "./components/PostBody.tsx";


const Post = () => {
    const location = useLocation();
    const itemId = location.state?.itemId; // Access the data using optional chaining

    const {data} = useQuery(
        ["getSingleItemNews", itemId],
        () => getSingleItemNews(itemId),
    );

    const findHighQualityImage = () => {
        if (data?.data?.response?.content?.elements && data?.data?.response?.content?.elements.length > 0 && data?.data?.response?.content?.elements[0]?.assets?.length > 0) {
            console.log()
            return data?.data?.response?.content?.elements[0]?.assets.filter((item: {
                file: string[];
            }) => item?.file.includes("1000.jpg" || "1000.png"))[0]?.file
        }
        return data?.data?.response?.content?.fields?.thumbnail
    }
    return (

        <div className={` bg-white max-w-[1440px] mx-auto p-10 min-h-[100vh]`}>
            <img className={`w-full rounded-md`} src={findHighQualityImage()}
                 alt={data?.data?.response?.content?.fields?.headline}/>
            <Title title={data?.data?.response?.content?.fields?.headline} className={`py-10`}/>
            <PostBody postBody={data?.data?.response?.content?.fields?.body}/>
        </div>
    );
};

export default Post;
